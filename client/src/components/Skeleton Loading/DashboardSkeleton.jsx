import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const DashboardSkeleton = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 md:p-6 w-full">
      {/* Title Skeleton */}
      <SkeletonLoader className="h-10 w-2/3 mx-auto mb-6" />

      {/* Key Metrics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonLoader key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>

      {/* User Table & AI Insights Skeleton */}
      <div className="flex flex-col gap-6 mt-6">
        {/* User Table Skeleton */}
        <SkeletonLoader className="h-64 w-full rounded-lg" />
        {/* AI Insights Skeleton */}
        <SkeletonLoader className="h-64 w-full rounded-lg" />
      </div>

      {/* Churn Prediction Skeleton */}
      <SkeletonLoader className="h-64 w-full mt-6 rounded-lg" />
    </div>
  );
};

export default DashboardSkeleton;
