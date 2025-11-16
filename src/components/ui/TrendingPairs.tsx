import { useEffect, useState } from 'react'

type Coin = {
  id: number
  name: string
  symbol: string
  slug?: string
  quote?: {
    USD?: {
      price?: number
      market_cap?: number
      volume_24h?: number
      percent_change_24h?: number
    }
  }
}

type ListingsResponse = {
  data?: Coin[]
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function TrendingPairs() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true)
        // Tenta via proxy local/produção
        // Usa CoinMarketCap via função serverless
        let res = await fetch('/api/cmc/listings?limit=6', { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: ListingsResponse = await res.json()
        setCoins((data.data || []).slice(0, 6))
      } catch (err: any) {
        setError(err?.message || 'Falha ao carregar dados do CoinMarketCap')
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Criptos em destaque</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">Fonte: CoinMarketCap (Top {coins.length || 6}).</p>
        </div>

        {loading && (
          <div className="mt-8 text-center text-gray-600">Carregando tendências…</div>
        )}
        {error && (
          <div className="mt-8 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coins.map((c, i) => (
              <article key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {c.name} <span className="text-gray-500">({c.symbol})</span>
                  </h3>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Preço (USD)</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {c.quote?.USD?.price != null ? Number(c.quote?.USD?.price).toFixed(6) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Volume 24h</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {c.quote?.USD?.volume_24h != null ? currency.format(c.quote?.USD?.volume_24h) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Market Cap</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {c.quote?.USD?.market_cap != null ? currency.format(c.quote?.USD?.market_cap) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Variação 24h</dt>
                    <dd className={`text-base font-semibold ${Number(c.quote?.USD?.percent_change_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {c.quote?.USD?.percent_change_24h != null ? `${Number(c.quote?.USD?.percent_change_24h).toFixed(2)}%` : '—'}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}