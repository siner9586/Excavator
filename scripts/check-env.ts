import 'dotenv/config'

const required = ['DATABASE_URL', 'DIRECT_URL', 'NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_APP_NAME']

const missing = required.filter((key) => !process.env[key])

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(', ')}`)
  process.exit(1)
}

if (process.env.DATABASE_URL?.includes('-pooler')) {
  console.log('DATABASE_URL uses a pooled Neon connection.')
} else {
  console.warn('DATABASE_URL does not look like a pooled Neon connection.')
}

if (process.env.DIRECT_URL?.includes('-pooler')) {
  console.warn('DIRECT_URL should use a direct non-pooler Neon host.')
} else {
  console.log('DIRECT_URL uses a direct connection host.')
}

console.log('Environment check passed.')
