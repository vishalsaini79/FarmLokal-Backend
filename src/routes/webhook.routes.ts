import { Router } from "express";
import { apiBWebhookHandler } from "../webhooks/apiB.webhook";

const router = Router();

router.post("/webhook/api-b", apiBWebhookHandler);

export default router;