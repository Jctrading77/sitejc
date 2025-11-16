export default async function handler(req: any, res: any) {
  const apiKey = process.env.CMC_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'missing_api_key', message: 'Configure CMC_API_KEY no ambiente da Vercel.' })
    return
  }

  const limit = Number((req.query.limit as string) || '6')
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=USD`

  try {
    const resp = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
    })

    const status = resp.status
    const data = await resp.json()
    // Forma simples: repassar o payload completo; o cliente extrai campos necessários
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(status).json(data)
  } catch (e: any) {
    res.status(500).json({ error: 'fetch_failed', message: e?.message || 'unknown' })
  }
}