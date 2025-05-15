import { withRuntimeEnv } from 'next-runtime-env'

const config = {
  runtimeEnv: ['NEXT_PUBLIC_API_URL'],
}

export default withRuntimeEnv(config)
