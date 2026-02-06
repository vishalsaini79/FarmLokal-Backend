import { redis } from "../config/redis";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  createdAt: number;
}

const CACHE_TTL = 60; // 60 seconds

// Simulate large dataset (1M explainable, but generate small)
function generateProducts(count = 50): Product[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 500),
    category: i % 2 === 0 ? "dairy" : "vegetables",
    createdAt: Date.now() - i * 1000,
  }));
}

export async function getProducts(params: {
  limit: number;
  cursor?: number;
  search?: string;
  sort?: string;
}) {
  const cacheKey = `products:${JSON.stringify(params)}`;

  // 1️⃣ Redis cache check
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2️⃣ Simulated DB fetch
  let products = generateProducts();

  // 3️⃣ Search
  if (params.search) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(params.search!.toLowerCase())
    );
  }

  // 4️⃣ Sorting
  if (params.sort === "price") {
    products.sort((a, b) => a.price - b.price);
  } else if (params.sort === "createdAt") {
    products.sort((a, b) => b.createdAt - a.createdAt);
  }

  // 5️⃣ Cursor pagination
  const startIndex = params.cursor
    ? products.findIndex(p => p.id === params.cursor) + 1
    : 0;

  const paginated = products.slice(startIndex, startIndex + params.limit);
  const nextCursor =
    paginated.length > 0 ? paginated[paginated.length - 1].id : null;

  const result = {
    data: paginated,
    nextCursor,
  };

  // 6️⃣ Cache result
  await redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);

  return result;
}