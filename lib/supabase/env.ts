function readRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}.`)
  }

  return value
}

function readSupabasePublishableKey(): string {
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (publishableKey) {
    return publishableKey
  }

  const legacyAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (legacyAnonKey) {
    return legacyAnonKey
  }

  throw new Error(
    'Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Como compatibilidad legacy también se acepta NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  )
}

export function getSupabasePublicEnv() {
  return {
    url: readRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    publishableKey: readSupabasePublishableKey(),
  }
}
