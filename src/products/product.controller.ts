import { Request, Response } from "express";
import { getProducts } from "./product.service";

export async function listProducts(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor
    ? Number(req.query.cursor)
    : undefined;

  const search = req.query.search as string | undefined;
  const sort = req.query.sort as string | undefined;

  const result = await getProducts({
    limit,
    cursor,
    search,
    sort,
  });

  res.json(result);
}