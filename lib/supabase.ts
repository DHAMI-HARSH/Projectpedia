import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv, getServerSupabaseEnv } from "./env";

const publicEnv = getPublicSupabaseEnv();
const serverEnv = getServerSupabaseEnv();

export const supabase = createClient(
  publicEnv.url,
  publicEnv.anonKey,
);

export const supabaseAdmin = createClient(
  serverEnv.url,
  serverEnv.serviceRoleKey,
);
