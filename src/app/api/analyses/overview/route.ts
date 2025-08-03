import { NextRequest } from 'next/server'

const DESTINATION_URL = `${process.env.INTERNAL_API_URL}/analyses/overview`

async function handler(req: NextRequest) {
  const destination = new URL(DESTINATION_URL)

  // Append query params from the original request
  req.nextUrl.searchParams.forEach((value, key) => {
    destination.searchParams.append(key, value)
  })

  const headers = new Headers(req.headers)
  headers.set('host', destination.host)

  try {
    const response = await fetch(destination, {
      method: req.method,
      headers: headers,
      body: req.body,
      // @ts-ignore
      duplex: 'half',
    })

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return new Response(JSON.stringify({ error: 'Proxy failed' }), { status: 500 })
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }
