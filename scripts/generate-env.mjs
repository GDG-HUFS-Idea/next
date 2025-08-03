import fs from 'fs'
import path from 'path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv
// 1. 환경별 .env 파일 파싱
async function parseEnvFile(env) {
  const envFilePath = path.resolve(process.cwd(), `.env.${env}`)

  if (!fs.existsSync(envFilePath)) {
    console.warn(`Environment file .env.${env} not found`)
    return {}
  }

  const envContent = fs.readFileSync(envFilePath, 'utf8')
  const envVars = {}

  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=')
    if (key && value) {
      envVars[key.trim()] = value.trim().replace(/['"]/g, '')
    }
  })

  return envVars
}

// 2. window.__ENV 스크립트 파일 생성
function generateEnvScript(envVars) {
  const publicDir = path.resolve(process.cwd(), 'public')
  const scriptPath = path.join(publicDir, '__ENV.js')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const scriptContent = `window.__ENV = ${JSON.stringify(envVars, null, 2)};`
  fs.writeFileSync(scriptPath, scriptContent)

  console.log(`✅ Generated ${scriptPath}`)
}

// 3. .env 파일 복사 (서버사이드용)
function copyEnvFile(env) {
  const sourceEnvPath = path.resolve(process.cwd(), `.env.${env}`)
  const targetEnvPath = path.resolve(process.cwd(), '.env')

  if (fs.existsSync(sourceEnvPath)) {
    fs.copyFileSync(sourceEnvPath, targetEnvPath)
    console.log(`✅ Copied .env.${env} to .env`)
  }
}

// 4. CLI 실행
yargs(hideBin(process.argv))
  .command(
    'setup-env',
    'Setup runtime environment for Next.js',
    (yargs) => {
      return yargs.option('env', {
        alias: 'e',
        type: 'string',
        description: 'Environment name (dev, staging, production)',
        default: 'dev',
      })
    },
    async (argv) => {
      const env = argv.env
      console.log(`🚀 Setting up environment: ${env}`)

      const envVars = await parseEnvFile(env)
      generateEnvScript(envVars)
      copyEnvFile(env)

      console.log('✨ Environment setup completed!')
    }
  )
  .parse()
