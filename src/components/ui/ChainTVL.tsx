import { useEffect, useState } from 'react'

type Chain = {
  name: string
  tvl: number
}

const currency0 = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function ChainTVL() {
  const [chains, setChains] = useState<Chain[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChains = async () => {
      try {
        setLoading(true)
        let res = await fetch('/api/chains', { cache: 'no-store' })
        if (!res.ok) {
          res = await fetch('https://api.llama.fi/chains', { cache: 'no-store' })
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const top = (data || [])
          .filter((c: any) => typeof c.tvl === 'number' && c.tvl > 0)
          .sort((a: any, b: any) => b.tvl - a.tvl)
          .slice(0, 6)
          .map((c: any) => ({ name: c.name, tvl: c.tvl }))
        setChains(top)
      } catch (err: any) {
        setError(err?.message || 'Falha ao carregar TVL por chain')
      } finally {
        setLoading(false)
      }
    }
    fetchChains()
  }, [])

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">TVL por blockchain</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Total Value Locked (DefiLlama), top 6 redes por valor travado.
          </p>
        </div>

        {loading && (
          <div className="mt-8 text-center text-gray-600">Carregando TVL…</div>
        )}
        {error && (
          <div className="mt-8 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chains.map((c, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">Valor total travado</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{currency0.format(c.tvl)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}