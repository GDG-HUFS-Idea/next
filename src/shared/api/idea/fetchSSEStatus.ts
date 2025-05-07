// utils/fetchSSEStatus.ts

import type { AnalysisStatusResponse } from '@/shared/api/idea/ideaInput'

export async function fetchSSEStatus({
  taskId,
  token,
  onProgress,
}: {
  taskId: string
  token: string
  onProgress?: (status: AnalysisStatusResponse) => void // ✅ 수정
}): Promise<AnalysisStatusResponse> {
  const url = new URL(
    '/projects/analyses/overview/status',
    'http://suehyun.kro.kr'
  )
  url.searchParams.set('task_id', taskId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'text/event-stream',
    },
  })

  if (!response.ok || !response.body) {
    throw new Error('SSE 연결 실패')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''

    for (const event of events) {
      const lines = event.split('\n')
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonString = line.slice(6)
          try {
            const data: AnalysisStatusResponse = JSON.parse(jsonString)

            if (data.is_complete) {
              return data
            } else {
              onProgress?.(data) // ✅ 전체 status 객체 전달
            }
          } catch (err) {
            console.warn('파싱 실패:', err)
          }
        }
      }
    }
  }

  throw new Error('예상치 못한 종료')
}
