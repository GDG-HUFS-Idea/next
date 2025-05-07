import { NextResponse } from 'next/server'

// 외부 API의 기본 URL
const BASE_URL = 'http://suehyun.kro.kr' // 실제 API URL로 변경하세요

// GET 요청 처리 - 단순히 baseURL 반환
export async function GET() {
  return NextResponse.json({ baseUrl: BASE_URL })
}
