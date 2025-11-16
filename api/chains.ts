import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = 'https://api.llama.fi/chains'
    const resp = await fetch(upstream, {
      headers: {
        'accept': 'application/json, text/plain, */*',
      },
    })

    const status = resp.status
    const data = await resp.json()
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(status).json(data)
  } catch (e: any) {
    res.status(500).json({ error: 'fetch_failed', message: e?.message || 'unknown' })
  }
}