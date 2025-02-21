import React from "react";
import { motion } from "framer-motion";

function ChurnPrediction({ churnPredictions }) {
  // Sort users by risk level (High -> Medium -> Low)
  const sortedUsers =
    churnPredictions &&
    [...churnPredictions].sort((a, b) => {
      const riskOrder = { High: 0, Medium: 1, Low: 2 };
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    });

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full  mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-400">
        📉 Churn Predictions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedUsers?.length > 0 ? (
          sortedUsers.map((user, index) => (
            <motion.div
              key={user.userId}
              className={`p-5 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 transition-all transform hover:shadow-xl relative items-center sm:items-start
                ${
                  user.riskLevel === "High"
                    ? "bg-red-800/30 animate-pulse"
                    : user.riskLevel === "Medium"
                    ? "bg-yellow-800/30"
                    : "bg-green-800/30"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img
                src={`https://thispersondoesnotexist.com`}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg font-semibold text-white">{user.name}</p>
                <p className="text-sm text-blue-400 break-all">{user.email}</p>
                <p className="text-sm text-gray-300 mt-1">
                  🕒 Last Active: {new Date(user.lastLogin).toDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 sm:my-auto rounded-md font-semibold text-sm w-full sm:w-auto text-center
                ${
                  user.riskLevel === "High"
                    ? "bg-red-500 text-white"
                    : user.riskLevel === "Medium"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-green-500 text-white"
                }`}
              >
                {user.riskLevel} Risk
              </span>

              {user.riskLevel === "High" && (
                <span className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded-md animate-pulse">
                  Immediate Attention Needed!
                </span>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">
            No likely churn users found ✅
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default ChurnPrediction;
