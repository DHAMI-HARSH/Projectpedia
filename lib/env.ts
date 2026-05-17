function readEnv(name: string) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

export function getPublicSupabaseEnv() {
  return {
    anonKey: readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    url: readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  };
}

export function getServerSupabaseEnv() {
  return {
    serviceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
    ...getPublicSupabaseEnv(),
  };
}

export function getAdminEnv() {
  return {
    password: readEnv("ADMIN_PASSWORD"),
    secret: process.env.AUTH_SECRET?.trim() || readEnv("NEXTAUTH_SECRET"),
    username: readEnv("ADMIN_USERNAME"),
  };
}
