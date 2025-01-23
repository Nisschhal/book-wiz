import config from "@/lib/config";
//import { drizzle } from 'drizzle-orm/neon-serverless'; // doesn't work idk why
// so use first one neon-http

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(config.env.databaseUrl);
export const db = drizzle({ client: sql });
