import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

function sign(payload: string) {
  return createHmac('sha256', process.env.SESSION_SECRET!)
    .update(payload)
    .digest('hex')
}

export function verifySessionValue(value: string | undefined) {
  if (!value) return false

  const [expiresAt, signature] = value.split('.')
  if (!expiresAt || !signature) return false
  if (Date.now() > Number(expiresAt)) return false

  const expected = sign(`admin:${expiresAt}`)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}

export async function createSession() {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const signature = sign(`admin:${expiresAt}`)

  const store = await cookies()
  store.set(COOKIE_NAME, `${expiresAt}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(expiresAt),
  })
}

export async function destroySession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isSessionValid() {
  const store = await cookies()
  return verifySessionValue(store.get(COOKIE_NAME)?.value)
}

export async function requireSession() {
  if (!(await isSessionValid())) {
    throw new Error('Not authenticated')
  }
}

export { COOKIE_NAME }
