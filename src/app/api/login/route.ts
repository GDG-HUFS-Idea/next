import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// GET 요청 처리 - 현재 쿠키 상태 확인
export async function GET() {
  const cookieStore = await cookies()
  const user_jwt = cookieStore.get('user_jwt')?.value

  return Response.json({
    jwt: user_jwt ?? null,
  })
}

// POST 요청 처리 - 백엔드에서 받은 토큰을 쿠키에 저장
export async function POST(req: NextRequest) {
  try {
    // 요청 본문에서 토큰 추출
    const body = await req.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: '토큰이 제공되지 않았습니다.' },
        { status: 400 }
      )
    }

    // 응답 객체 생성
    const response = NextResponse.json({
      success: true,
      message: '토큰이 쿠키에 저장되었습니다.',
    })

    // 쿠키에 토큰 저장
    response.cookies.set({
      name: 'user_jwt',
      value: token,
      maxAge: 60 * 60 * 24 * 7, // 1주일
      path: '/',
      sameSite: 'strict',
    })

    return response
  } catch (error) {
    console.error('토큰 저장 중 오류:', error)
    return NextResponse.json(
      { error: '토큰 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE 요청 처리 - 로그아웃 (쿠키 삭제)
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: '로그아웃 되었습니다.',
  })

  // 쿠키 삭제
  response.cookies.delete('user_jwt')

  return response
}
