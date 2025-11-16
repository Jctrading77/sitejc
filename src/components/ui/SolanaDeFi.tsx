import { useEffect, useState } from 'react'

type Item = {
  name: string
  slug: string
  category?: string
  logo?: string
  url?: string
  tvlSolana: number
}

export default function SolanaDeFi() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ac = new AbortController()
    let attempts = 0

    async function load() {
      attempts += 1
      try {
        const r = await fetch('/api/solana/defi', { cache: 'no-store', signal: ac.signal })
        if (!r.ok) throw new Error('Falha ao obter dados de Solana DeFi')
        const data = await r.json()
        setItems(data.items || [])
      } catch (e: any) {
        // Ignora aborts causados por StrictMode/React Refresh e tenta novamente uma vez
        if (e?.name === 'AbortError') {
          return
        }
        if (attempts < 2) {
          setTimeout(load, 200)
          return
        }
        setError(e?.message || 'Erro ao carregar dados')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => {
      ac.abort()
    }
  }, [])

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Melhores DeFi em Solana</h2>
        <p className="text-muted-foreground">Carregando…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Melhores DeFi em Solana</h2>
        <p className="text-red-600">{error}</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-bold">Melhores DeFi em Solana</h2>
        <span className="text-sm text-muted-foreground">Fonte: DefiLlama</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <a
            key={p.slug}
            href={p.url || `https://defillama.com/protocol/${p.slug}`}
            target="_blank"
            rel="noreferrer"
            className="group rounded-lg border border-border/50 bg-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={p.logo || 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'}
                alt={p.name}
                width={40}
                height={40}
                decoding="async"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="h-10 w-10 rounded bg-white object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
                }}
              />
              <div>
                <div className="font-semibold leading-tight">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.category || 'DeFi'}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">TVL em Solana</div>
              <div className="font-semibold">${Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(p.tvlSolana)}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}