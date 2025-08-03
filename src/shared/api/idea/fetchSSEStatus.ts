import type { AnalysisStatusResponse } from '@/shared/api/idea/ideaInput'

interface FetchSSEStatusParams {
  taskId: string
  token?: string
  onProgress?: (status: AnalysisStatusResponse) => void
}

export async function fetchSSEStatus({
  taskId,
  token,
  onProgress,
}: FetchSSEStatusParams): Promise<AnalysisStatusResponse> {
  if (!token) throw new Error('인증 토큰이 필요합니다')

  const url = new URL('/api/analyses/overview/progress', window.location.origin)
  url.searchParams.set('task_id', taskId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })

  if (!response.ok) {
    console.log(response)
    throw new Error(`SSE 연결 실패: ${response.status} ${response.statusText}`)
  }

  if (!response.body) {
    console.log(response)

    throw new Error('응답 스트림이 존재하지 않습니다')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let lastData: AnalysisStatusResponse | null = null

  try {
    while (true) {
      const { value, done } = await reader.read()

      if (done || !value) {
        if (lastData) return lastData
        throw new Error('스트림 종료: 유효한 데이터를 받지 못함')
      }

      buffer += decoder.decode(value, { stream: true })
      const events = buffer.split('\n\n')
      buffer = events.pop() ?? '' // 마지막 조각 남기기

      for (const rawEvent of events) {
        const parsed = parseSSEEvent(rawEvent)
        if (!parsed) continue

        lastData = parsed
        onProgress?.(parsed)

        if (parsed.status === 'failed') {
          throw new Error(parsed.message ?? '분석 실패')
        }

        if (parsed.is_complete) {
          return parsed
        }
      }
    }
  } catch (err) {
    console.error('❌ SSE 처리 오류:', err)
    throw err
  } finally {
    try {
      await reader.cancel()
      reader.releaseLock()
    } catch (cleanupErr) {
      console.warn('⚠️ 리더 정리 중 오류:', cleanupErr)
    }
  }
}

// 📦 이벤트 파싱 유틸
function parseSSEEvent(event: string): AnalysisStatusResponse | null {
  const lines = event.split('\n')
  let data = ''
  let eventType = ''

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      data += line.slice(6)
    } else if (line.startsWith('event: ')) {
      eventType = line.slice(7)
    }
  }

  if (!data) return null
  if (eventType && eventType !== 'status') return null

  try {
    return JSON.parse(data)
  } catch (err) {
    console.warn('⚠️ JSON 파싱 실패:', err, 'Raw:', data)
    return null
  }
}
