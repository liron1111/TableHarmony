import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

import { getIp } from "@/lib/get-ip";
import { RateLimitError } from "@/lib/errors";

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "10s"),
});

export async function assertRateLimit() {
  const ip = getIp();

  if (!ip) throw new RateLimitError();

  const { success } = await rateLimit.limit(ip);

  if (!success) throw new RateLimitError();
}
