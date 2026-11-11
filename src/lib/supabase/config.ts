export interface SupabaseEnvConfig {
  url: string;
  anonKey: string;
}

/**
 * Returns Supabase public credentials when both required environment variables exist.
 * Keeps initial Vercel deployments working smoothly before Supabase is connected.
 */
export function getSupabaseConfig(): SupabaseEnvConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}
