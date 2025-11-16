// Serverless function: Top Solana DeFi protocols by Solana TVL
// Data source: DefiLlama

const DEFILLAMA_PROTOCOLS = 'https://api.llama.fi/protocols'
const DEFILLAMA_PROTOCOL_DETAIL = (slug: string) => `https://api.llama.fi/protocol/${slug}`

type ProtocolSummary = {
  name: string
  slug: string
  chains?: string[]
  category?: string
  logo?: string
  url?: string
  tvl?: number
}

type ProtocolDetail = {
  chainTvls?: Record<string, { tvl?: Array<{ date: number; totalLiquidityUSD?: number; tvl?: number }> }>
}

export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(DEFILLAMA_PROTOCOLS)
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch protocols from DefiLlama' })
    }
    const allProtocols: ProtocolSummary[] = await response.json()

    // Filter protocols that operate on Solana and are DeFi categories
    const allowedCategories = new Set([
      'Dexes',
      'Dexs',
      'Lending',
      'Liquid Staking',
      'Yield',
      'CDP',
      'Perps',
      'Derivatives',
      'Options',
      'Staking',
    ])

    const solanaProtocols = allProtocols
      .filter((p) => (p.chains || []).includes('Solana'))
      .filter((p) => p.category && allowedCategories.has(p.category))

    // Select candidates by overall TVL first, then refine with Solana-specific TVL
    const candidates = solanaProtocols
      .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
      .slice(0, 20)

    // Fetch per-protocol detail to compute Solana-only TVL
    const details = await Promise.all(
      candidates.map(async (p) => {
        try {
          const r = await fetch(DEFILLAMA_PROTOCOL_DETAIL(p.slug))
          if (!r.ok) return { slug: p.slug, solanaTVL: 0 }
          const d: ProtocolDetail = await r.json()
          const chain = d.chainTvls?.['Solana']
          const series = chain?.tvl || []
          const last = series[series.length - 1]
          const solanaTVL =
            last?.totalLiquidityUSD ?? last?.tvl ?? 0
          return { slug: p.slug, solanaTVL }
        } catch {
          return { slug: p.slug, solanaTVL: 0 }
        }
      })
    )

    const tvlMap = new Map(details.map((d) => [d.slug, d.solanaTVL]))

    const enriched = candidates
      .map((p) => ({
        name: p.name,
        slug: p.slug,
        category: p.category,
        logo: p.logo,
        url: p.url,
        tvlSolana: tvlMap.get(p.slug) || 0,
      }))
      .filter((p) => p.tvlSolana > 0)
      .sort((a, b) => b.tvlSolana - a.tvlSolana)
      .slice(0, 12)

    // Cache for 10 minutes on Vercel CDN
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
    return res.status(200).json({ items: enriched })
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', details: String(err) })
  }
}