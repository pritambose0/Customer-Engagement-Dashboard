import React from "react";

const SkeletonLoader = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-700 rounded ${className}`}></div>
  );
};

export default SkeletonLoader;
