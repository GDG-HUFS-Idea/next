module.exports = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      // ✅ Auth endpoints (query string 전달 가능하게 유지)
      {
        source: '/api/auth/oauth/result',
        destination: 'http://suehyun.kro.kr/auth/oauth/result',
      },
      {
        source: '/api/auth/oauth/signup',
        destination: 'http://suehyun.kro.kr/auth/oauth/signup',
      },

      // ✅ Terms endpoint (ids 배열을 query로 전달 가능)
      {
        source: '/api/terms',
        destination: 'http://suehyun.kro.kr/terms',
      },

      // ✅ Projects endpoint (offset, limit은 프록시 요청 시 query로 전달)
      {
        source: '/api/projects',
        destination: 'http://suehyun.kro.kr/projects',
      },

      // ✅ Analysis endpoints
      {
        source: '/api/analyses/overview',
        destination: 'http://suehyun.kro.kr/analyses/overview',
      },
      {
        source: '/api/analyses/overview/progress',
        destination: 'http://suehyun.kro.kr/analyses/overview/progress',
      },
    ]
  },
}
