import { useEffect, useState } from 'react'

type Pair = {
  chainId?: string
  dexId?: string
  url?: string
  pairAddress?: string
  baseToken?: { address?: string; symbol?: string }
  quoteToken?: { address?: string; symbol?: string }
  priceUsd?: string
  fdv?: number
  volume?: { h24?: number }
}

type TrendingResponse = {
  pairs?: Pair[]
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function TrendingPairs() {
  const [pairs, setPairs] = useState<Pair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true)
        // Tenta via proxy local/produção
        let res = await fetch('/api/trending', { cache: 'no-store' })
        if (!res.ok) {
          // Fallback direto caso proxy não esteja disponível no dev
          res = await fetch('https://api.dexscreener.com/latest/dex/trending', { cache: 'no-store' })
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: TrendingResponse = await res.json()
        setPairs((data.pairs || []).slice(0, 6))
      } catch (err: any) {
        setError(err?.message || 'Falha ao carregar tendências')
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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tendências on-chain</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Pares em destaque (DexScreener), com preço e volume 24h.
          </p>
        </div>

        {loading && (
          <div className="mt-8 text-center text-gray-600">Carregando tendências…</div>
        )}
        {error && (
          <div className="mt-8 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pairs.map((p, i) => (
              <article key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.baseToken?.symbol} / {p.quoteToken?.symbol}
                  </h3>
                  {p.chainId && (
                    <span className="text-xs text-gray-500">{p.chainId}</span>
                  )}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Preço (USD)</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {p.priceUsd ? Number(p.priceUsd).toFixed(6) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Volume 24h</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {p.volume?.h24 ? currency.format(p.volume.h24) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">FDV</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {p.fdv ? currency.format(p.fdv) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">DEX</dt>
                    <dd className="text-base font-semibold text-gray-900">{p.dexId || '—'}</dd>
                  </div>
                </dl>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Ver no DexScreener →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}