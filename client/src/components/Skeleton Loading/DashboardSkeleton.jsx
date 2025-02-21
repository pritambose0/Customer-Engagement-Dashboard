import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const DashboardSkeleton = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Title Skeleton */}
      <SkeletonLoader className="h-10 w-2/3 mx-auto mb-6" />

      {/* Key Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonLoader key={i} className="h-24 w-full rounded-lg p-6" />
        ))}
      </div>

      {/* Chart Skeleton */}
      <SkeletonLoader className="h-64 w-full mt-6 rounded-lg" />

      {/* User Table & AI Insights Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SkeletonLoader className="h-64 w-full rounded-lg" />
        <SkeletonLoader className="h-64 w-full rounded-lg" />
      </div>

      {/* Churn Prediction Skeleton */}
      <SkeletonLoader className="h-64 w-full mt-6 rounded-lg" />
    </div>
  );
};

export default DashboardSkeleton;
