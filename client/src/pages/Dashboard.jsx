import { useEffect, useState } from "react";
import {
  fetchUsers,
  fetchEngagementScore,
  fetchChurnPrediction,
  fetchAIInsights,
  fetchActiveUsers,
  fetchRetentionRate,
} from "../services/api";
import { UserTable } from "../components/UserTable";
import { AIInsights } from "../components/AIInsights";
import { motion } from "framer-motion";
import ChurnPrediction from "../components/ChurnPrediction";
import DashboardSkeleton from "../components/Skeleton Loading/DashboardSkeleton";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [engagementScore, setEngagementScore] = useState([]);
  const [churnPredictions, setChurnPredictions] = useState([]);
  const [activeUsers, setActiveUsers] = useState({});
  const [insights, setInsights] = useState([]);
  const [retentionRate, setRetentionRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchUsers().then(setUsers),
      fetchEngagementScore().then(setEngagementScore),
      fetchChurnPrediction().then(setChurnPredictions),
      fetchActiveUsers().then(setActiveUsers),
      fetchAIInsights().then(setInsights),
      fetchRetentionRate().then(setRetentionRate),
    ]).then(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-0 sm:p-4 md:p-6 w-full">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold mb-6 text-center py-5 text-indigo-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        User Engagement Dashboard
      </motion.h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
        {/* Active Users */}
        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-gray-400 flex items-center gap-2">
            📅 Active Users
          </h2>
          <div className="mt-3 flex space-x-6 my-auto">
            <p className="text-md text-gray-300">
              Today:{" "}
              <span className="font-semibold text-indigo-300">
                {activeUsers?.dailyActiveUsers || 0}
              </span>
            </p>
            <p className="text-md text-gray-300">
              Weekly:{" "}
              <span className="font-semibold text-indigo-300">
                {activeUsers?.weeklyActiveUsers || 0}
              </span>
            </p>
            <p className="text-md text-gray-300">
              Monthly:{" "}
              <span className="font-semibold text-indigo-300">
                {activeUsers?.monthlyActiveUsers || 0}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Engagement Score */}
        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-gray-400 flex items-center gap-2">
            🔥 Engagement Score
          </h2>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {engagementScore || 0}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Overall user interaction</p>
        </motion.div>

        {/* Retention Rate */}
        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-gray-400 flex items-center gap-2">
            🔄 Retention Rate
          </h2>
          <p className="text-4xl font-bold text-yellow-400 mt-2">
            {retentionRate || 0}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Returning users over time
          </p>
        </motion.div>
      </div>

      {/* User Table & AI Insights */}
      <div className="flex flex-col gap-6 mt-6">
        {/* User Activity Table */}
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <UserTable users={users} setUsers={setUsers} />
        </motion.div>

        {/* AI Insights Section */}
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <AIInsights insights={insights} />
        </motion.div>
      </div>

      {/* Churn Predictions */}
      <ChurnPrediction churnPredictions={churnPredictions} />
    </div>
  );
};
