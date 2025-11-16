import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = 'https://api.dexscreener.com/latest/dex/trending'
    const resp = await fetch(upstream, {
      // Alguns provedores podem aplicar desafios; usar headers típicos de navegador ajuda.
      headers: {
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      },
    })

    const status = resp.status
    const contentType = resp.headers.get('content-type') || ''
    const bodyText = await resp.text()

    if (!contentType.includes('application/json')) {
      res.status(502).json({ error: 'upstream_non_json', status })
      return
    }

    const data = JSON.parse(bodyText)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(status).json(data)
  } catch (e: any) {
    res.status(500).json({ error: 'fetch_failed', message: e?.message || 'unknown' })
  }
}