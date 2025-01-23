import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import redis from "@/database/redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"), // only one window|tab allowed
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
