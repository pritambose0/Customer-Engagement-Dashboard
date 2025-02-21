import { User } from "../models/user.model.js";
import { Engagement } from "../models/engagement.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Calculate engagement score
const calculateEngagementScore = (engagement) => {
  let engagementScore =
    engagement.logins * 2 +
    engagement.featureUsage * 5 +
    engagement.timeSpent * 1 +
    engagement.profileUpdates * 3 +
    engagement.comments * 4;
  // console.log("ENGAGEMENT", engagement);

  const now = new Date();
  const diffInDays = Math.floor(
    (now - engagement.lastLogin) / (1000 * 60 * 60 * 24)
  );

  engagementScore = engagementScore - diffInDays;

  return engagementScore;
};

// Mock AI insights
const getRecommendation = (
  score,
  logins,
  featureUsage,
  timeSpent,
  profileUpdates,
  comments
) => {
  if (score <= 81) {
    if (logins === 0)
      return "User is inactive. Trigger a personalized comeback email with incentives.";
    if (featureUsage < 3)
      return "Suggest the most used feature by similar users.";
    return "A/B test different engagement strategies.";
  }

  if (score <= 163) {
    if (profileUpdates > 1 && comments > 2)
      return "User is engaged socially. Push community-driven content.";
    if (timeSpent < 30)
      return "Encourage deeper engagement with challenges or streaks.";
    return "Suggest features aligned with user behavior trends.";
  }

  // High engagement: Provide personalized rewards
  if (logins > 8 && featureUsage > 10) return "Offer premium feature trials.";
  if (comments > 4) return "Encourage user-generated content contributions.";

  return "Recognize loyal users with shoutouts, exclusive perks, or gamified badges.";
};

const getAllUsers = asyncHandler(async (req, res) => {
  const { startDate, endDate, retentionCategory, search, minScore, maxScore } =
    req.query;

  let query = {};

  // Filtering by Date Range
  if (startDate && endDate) {
    query.lastLogin = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // Filtering by Retention Category
  if (retentionCategory) {
    query.retentionCategory = retentionCategory;
  }

  // Filtering by name or email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query);

  // Engagement scores for each user
  const usersWithEngagement = await Promise.all(
    users?.map(async (user) => {
      const engagement = await Engagement.findOne({ userId: user._id });

      // Engagement score (default = 0 if no data exists)
      const engagementScore = engagement
        ? calculateEngagementScore(engagement)
        : 0;

      let retentionCategory;
      if (engagementScore <= 81) {
        retentionCategory = "Low";
      } else if (engagementScore <= 163) {
        retentionCategory = "Medium";
      } else {
        retentionCategory = "High";
      }

      // Update retention category if it has changed
      if (user.retentionCategory !== retentionCategory) {
        user.retentionCategory = retentionCategory;
        await user.save();
      }

      return {
        userId: user._id,
        name: user.name,
        email: user.email,
        lastLogin: engagement?.lastLogin || new Date(),
        engagementScore,
        retentionCategory,
      };
    })
  );

  // Filtering by Engagement Score
  let filteredUsers = usersWithEngagement;
  if (minScore || maxScore) {
    filteredUsers = filteredUsers.filter((user) => {
      return (
        (!minScore || user.engagementScore >= minScore) &&
        (!maxScore || user.engagementScore <= maxScore)
      );
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, filteredUsers, "Users fetched successfully"));
});

const getActiveUsers = asyncHandler(async (_, res) => {
  const today = new Date();

  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  const last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30);

  const dailyActiveUsers = await User.countDocuments({
    lastLogin: { $gte: today },
  });
  const weeklyActiveUsers = await User.countDocuments({
    lastLogin: { $gte: last7Days },
  });
  const monthlyActiveUsers = await User.countDocuments({
    lastLogin: { $gte: last30Days },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        dailyActiveUsers,
        weeklyActiveUsers,
        monthlyActiveUsers,
      },
      "Engagement Metrics Fetched successfully"
    )
  );
});

const getEngagementScore = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const engagement = await Engagement.findOne({ userId });
  const engagementScore = engagement ? calculateEngagementScore(engagement) : 0;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        engagementScore,
        "Engagement Score fetched successfully"
      )
    );
});

const getOverallEngagementScore = asyncHandler(async (_, res) => {
  const allEngagements = await Engagement.find();
  const totalUsers = allEngagements.length;

  const totalScore = allEngagements.reduce((sum, engagement) => {
    return sum + calculateEngagementScore(engagement);
  }, 0);

  // Assuming max engagement per user is 244  20+75+120+9+20=244
  const maxPossibleScore = totalUsers * 244;

  const overallScore = ((totalScore / maxPossibleScore) * 100).toFixed(2);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        overallScore,
        "Overall engagement score fetched successfully"
      )
    );
});

const getRetentionRate = asyncHandler(async (_, res) => {
  const totalUsers = await User.countDocuments();
  const returningUsers = await User.countDocuments({
    retentionCategory: "High",
  });

  const retentionRate = ((returningUsers / totalUsers) * 100).toFixed(2);

  return res
    .status(200)
    .json(
      new ApiResponse(200, retentionRate, "Retention Rate fetched successfully")
    );
});

const getChurnPrediction = asyncHandler(async (_, res) => {
  const users = await User.find();
  let churnPredictions = [];

  for (const user of users) {
    const engagement = await Engagement.findOne({ userId: user._id });

    let engagementScore = engagement ? calculateEngagementScore(engagement) : 0;

    let riskLevel = "Low";
    if (engagementScore < 81) riskLevel = "High";
    else if (engagementScore < 163) riskLevel = "Medium";

    churnPredictions.push({
      userId: user._id,
      name: user.name,
      email: user.email,
      lastLogin: engagement?.lastLogin || new Date(),
      engagementScore,
      riskLevel,
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        churnPredictions,
        "Churn Predictions fetched successfully"
      )
    );
});

const getAIInsights = asyncHandler(async (_, res) => {
  const users = await User.find();
  let insights = [];

  for (const user of users) {
    const engagement = await Engagement.findOne({ userId: user._id });

    const engagementScore = engagement
      ? calculateEngagementScore(engagement)
      : 0;

    // Get recommendation based on engagement score
    const recommendation = getRecommendation(
      engagementScore,
      engagement.logins,
      engagement.featureUsage,
      engagement.timeSpent,
      engagement.profileUpdates,
      engagement.comments
    );

    insights.push({
      userId: user._id,
      name: user.name,
      email: user.email,
      retentionCategory: user.retentionCategory,
      engagementScore,
      recommendation,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, insights, "AI Insights fetched successfully"));
});

export {
  getAllUsers,
  getActiveUsers,
  getEngagementScore,
  getRetentionRate,
  getChurnPrediction,
  getAIInsights,
  getOverallEngagementScore,
};
