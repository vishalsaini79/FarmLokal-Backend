import { redis } from "../config/redis";

const TOKEN_KEY = "oauth:access_token";
const LOCK_KEY = "oauth:lock";

async function fetchNewToken() {
  await new Promise((res) => setTimeout(res, 300));

  return {
    access_token: "mock-access-token-" + Date.now(),
    expires_in: 60,
  };
}

export async function getAccessToken(): Promise<string> {
  const cached = await redis.get(TOKEN_KEY);
  if (cached) return cached;

  const lock = await redis.set(
    LOCK_KEY,
    "1",
    "EX",
    5,
    "NX"
  );

  if (!lock) {
    await new Promise((res) => setTimeout(res, 200));
    return getAccessToken();
  }

  try {
    const { access_token, expires_in } = await fetchNewToken();

    await redis.set(
      TOKEN_KEY,
      access_token,
      "EX",
      expires_in - 5
    );

    return access_token;
  } finally {
    await redis.del(LOCK_KEY);
  }
}