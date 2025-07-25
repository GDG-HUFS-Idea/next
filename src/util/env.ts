//lib/env.ts

declare global {
  interface Window {
    __ENV: Record<string, string>
  }
}

export function getEnv(key: string): string | undefined {
  // 클라이언트 사이드
  if (typeof window !== 'undefined') {
    return window.__ENV?.[key]
  }

  // 서버 사이드
  return process.env[key]
}

export function isClient(): boolean {
  return typeof window !== 'undefined'
}
