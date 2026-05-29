import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getServerSupabaseEnv } from "./env";

const serverEnv = getServerSupabaseEnv();

export const supabaseAdmin = createClient(serverEnv.url, serverEnv.serviceRoleKey);
