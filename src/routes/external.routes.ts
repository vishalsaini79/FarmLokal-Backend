import { Router } from "express";
import { fetchApiAData } from "../external/apiA.service";

const router = Router();

router.get("/external/api-a", async (req, res) => {
  try {
    const data = await fetchApiAData();
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "External API A failed",
    });
  }
});

export default router;