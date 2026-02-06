import { Request, Response } from "express";
import { redis } from "../config/redis";

const EVENT_KEY_PREFIX = "apiB:event:";

export async function apiBWebhookHandler(req: Request, res: Response) {
  const eventId = req.header("x-event-id");

  if (!eventId) {
    return res.status(400).json({ message: "Missing event id" });
  }

  // Idempotency check
  const alreadyProcessed = await redis.get(EVENT_KEY_PREFIX + eventId);
  if (alreadyProcessed) {
    return res.status(200).json({ message: "Duplicate event ignored" });
  }

  // Mark event as processed
  await redis.set(EVENT_KEY_PREFIX + eventId, "1", "EX", 600);

  // Simulate business logic
  console.log("Webhook received:", req.body);

  res.status(200).json({ message: "Event processed successfully" });
}