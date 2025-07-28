import { NextRequest } from 'next/server'

const DESTINATION_URL = `${process.env.INTERNAL_API_URL}/analyses/overview/progress`

export async function GET(req: NextRequest) {
  const destination = new URL(DESTINATION_URL)

  // 원본 요청의 쿼리 파라미터를 대상 URL에 추가합니다.
  req.nextUrl.searchParams.forEach((value, key) => {
    destination.searchParams.append(key, value)
  })

  // 인증 헤더와 필요한 헤더들을 복사합니다.
  const headers = new Headers()
  const authHeader = req.headers.get('Authorization')
  if (authHeader) {
    headers.set('Authorization', authHeader)
  }
  headers.set('Accept', 'text/event-stream')
  headers.set('Cache-Control', 'no-cache')
  headers.set('Connection', 'keep-alive')

  try {
    // 백엔드 SSE 엔드포인트에 fetch 요청을 보냅니다.
    const response = await fetch(destination, {
      method: 'GET',
      headers: headers,
      // @ts-ignore
      duplex: 'half', // 스트리밍 응답을 위해 필요합니다.
    })

    // 백엔드 응답이 스트림이 아니거나 오류가 발생한 경우
    if (!response.body) {
      return new Response('Backend did not provide a stream.', { status: 500 })
    }

    // ReadableStream을 직접 클라이언트로 전달하는 새로운 Response를 생성합니다.
    const stream = response.body
    return new Response(stream, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('SSE Proxy error:', error)
    return new Response(JSON.stringify({ error: 'SSE Proxy failed' }), {
      status: 500,
    })
  }
}