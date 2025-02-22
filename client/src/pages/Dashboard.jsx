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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFetchRetention = async () => {
    const data = await fetchRetentionRate(startDate, endDate);
    setRetentionRate(data);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
        {/* Active Users */}
        <motion.div className="bg-gray-800 bg-opacity-75 p-6 rounded-xl shadow-lg flex flex-col hover:shadow-2xl transition-all w-full gap-2 smd:gap-0 items-center">
          <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
            📅 Active Users
          </h2>
          <div className="my-auto flex gap-2 sm:gap-3">
            <p className="text-lg text-gray-400">
              Today:{" "}
              <span className="text-xl font-bold text-indigo-400">
                {activeUsers?.dailyActiveUsers || 0}
              </span>
            </p>
            <p className="text-lg text-gray-400">
              Weekly:{" "}
              <span className="text-xl font-bold text-blue-400">
                {activeUsers?.weeklyActiveUsers || 0}
              </span>
            </p>
            <p className="text-lg text-gray-400">
              Monthly:{" "}
              <span className="text-xl font-bold text-green-400">
                {activeUsers?.monthlyActiveUsers || 0}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Engagement Score */}
        <motion.div className="bg-gray-800 bg-opacity-75 p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition-all w-full">
          <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
            🔥 Engagement Score
          </h2>
          <div className="my-auto">
            <p className="text-5xl font-extrabold text-green-400 mt-2 sm:mt-4 drop-shadow-lg">
              {engagementScore || 0}%
            </p>
            <p className="text-sm text-gray-400 mt-1 tracking-wide">
              Overall user interaction
            </p>
          </div>
        </motion.div>

        {/* Retention Rate */}
        <motion.div className="bg-gray-800 bg-opacity-75 p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition-all w-full">
          <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
            🔄 Retention Rate
          </h2>

          {/* Date Range Input */}
          <div className="flex flex-col items-center gap-2 sm:gap-3 mt-3 sm:mt-4 w-full">
            <div className="flex gap-2 flex-col sm:flex-row sm:gap-3">
              <p className="text-sm text-gray-400 my-auto">Date Range:</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-800 text-white text-sm p-2 rounded-lg w-36 border border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-800 text-white text-sm p-2 rounded-lg w-36 border border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleFetchRetention}
                className="bg-indigo-500 px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Fetch
              </button>
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  handleFetchRetention();
                }}
                className="bg-gray-600 px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-gray-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Retention Rate Display - More Impactful */}
          <p className="text-4xl font-extrabold text-yellow-400 mt-3 sm:mt-4 drop-shadow-lg">
            {retentionRate || 0}%
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 tracking-wide">
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
