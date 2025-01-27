'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButtons() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>로딩 중...</p>
  }

  if (!session) {
    return (
      <>
        <button
          onClick={() =>
            (window.location.href =
              'https://just-for-me.kro.kr/api/oauth2/google')
          }
        >
          구글(백엔드)
        </button>
        <button onClick={() => signIn('google')}>구글로 로그인</button>
        <button onClick={() => signIn('naver')}>네이버로 로그인</button>
        <button onClick={() => signIn('kakao')}>카카오로 로그인</button>
      </>
    )
  }

  return (
    <div>
      <p>
        환영합니다, {session.user?.name}님! (ID: {session.user?.email})
      </p>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  )
}
