import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// GET 요청 처리 - 현재 쿠키 상태 확인
export async function GET() {
  const cookieStore = await cookies()
  const user_jwt = cookieStore.get('token')?.value
  const user_info = cookieStore.get('user')?.value

  return Response.json({
    jwt: user_jwt ?? null,
    user: user_info ? JSON.parse(decodeURIComponent(user_info)) : null,
  })
}

// POST 요청 처리 - 토큰과 사용자 정보를 쿠키에 저장
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { token, user } = body.req
    if (!token || !user) {
      return NextResponse.json(
        { error: '토큰 또는 사용자 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    const response = NextResponse.json({
      success: true,
      message: '토큰과 사용자 정보가 쿠키에 저장되었습니다.',
    })

    // JWT는 httpOnly 쿠키로 저장
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    })

    // 사용자 정보는 일반 쿠키로 저장 (직렬화 및 URI 인코딩)
    response.cookies.set({
      name: 'user',
      value: encodeURIComponent(JSON.stringify(user)),
      httpOnly: false,
      path: '/',
      sameSite: 'strict',
    })

    return response
  } catch (error) {
    console.error('토큰/사용자 정보 저장 중 오류:', error)
    return NextResponse.json(
      { error: '토큰/사용자 정보 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE 요청 처리 - 쿠키 삭제
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: '로그아웃 되었습니다.',
  })

  response.cookies.delete('user')
  response.cookies.delete('token')

  return response
}
