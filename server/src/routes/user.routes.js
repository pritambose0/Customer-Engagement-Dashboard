import { Router } from "express";
import {
  getActiveUsers,
  getAIInsights,
  getAllUsers,
  getChurnPrediction,
  getEngagementScore,
  getOverallEngagementScore,
  getRetentionRate,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getAllUsers);

router.get("/engagement-score/:userId", getEngagementScore);
router.get("/engagement-score", getOverallEngagementScore);
router.get("/active-users", getActiveUsers);
router.get("/retention-rate", getRetentionRate);
router.get("/churn-prediction", getChurnPrediction);
router.get("/ai-insights", getAIInsights);

export default router;
