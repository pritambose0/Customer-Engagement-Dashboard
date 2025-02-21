import { motion } from "framer-motion";

export const AIInsights = ({ insights }) => {
  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full  mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-indigo-400">
        🤖 AI-Powered Insights
      </h2>

      {insights?.length === 0 ? (
        <p className="text-gray-400 text-center">No insights available.</p>
      ) : (
        <div className="space-y-4">
          {insights?.map((insight, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg shadow-md bg-gray-800 border border-gray-700 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-4 items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className="w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl flex-shrink-0 mx-auto"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                style={{
                  background:
                    insight.type === "Engagement"
                      ? "linear-gradient(to right, #4CAF50, #8BC34A)"
                      : insight.type === "Retention"
                      ? "linear-gradient(to right, #FF9800, #FF5722)"
                      : "linear-gradient(to right, #3F51B5, #673AB7)",
                }}
              >
                {insight.type === "Engagement"
                  ? "🚀"
                  : insight.type === "Retention"
                  ? "🔄"
                  : "💡"}
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                  <div className="flex gap-2 items-center flex-wrap">
                    <p className="text-lg font-semibold text-gray-400">Name:</p>
                    <p
                      className={`text-base font-semibold ${
                        insight.type === "Engagement"
                          ? "text-green-300"
                          : insight.type === "Retention"
                          ? "text-orange-300"
                          : "text-indigo-300"
                      }`}
                    >
                      {insight.name}
                    </p>
                  </div>

                  <p
                    className={`px-3 py-1 rounded-md font-semibold text-sm w-full sm:w-auto text-center sm:text-left ${
                      insight.retentionCategory === "High"
                        ? "bg-green-500 text-white"
                        : insight.retentionCategory === "Medium"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {insight.retentionCategory} Retention
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-center mt-2 text-center sm:text-left">
                  <p className="text-sm font-semibold">What You Can Do :</p>
                  <p className="text-gray-300 italic border-l-4 border-indigo-500 pl-3">
                    "{insight.recommendation}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
