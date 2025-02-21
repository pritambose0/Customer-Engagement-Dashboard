import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUsers } from "../services/api";

const UserTable = ({ users, setUsers }) => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [retentionCategory, setRetentionCategory] = useState("");

  // Function to fetch filtered data
  const handleFilterChange = async () => {
    const filters = {
      search,
      startDate: startDate ? startDate.toISOString().split("T")[0] : undefined,
      endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
      minScore: minScore || undefined,
      maxScore: maxScore || undefined,
      retentionCategory: retentionCategory || undefined,
    };

    const filteredUsers = await fetchUsers(filters);
    setUsers(filteredUsers);
  };

  // Function to reset filters
  const handleResetFilters = async () => {
    setSearch("");
    setStartDate(null);
    setEndDate(null);
    setMinScore("");
    setMaxScore("");
    setRetentionCategory("");

    // Fetching all users again (without filters)
    const allUsers = await fetchUsers();
    setUsers(allUsers);
  };

  return (
    <div className="w-full bg-gray-900 p-6 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">
        👥 User Activity Table
      </h2>

      {/* Search & Filter Buttons */}
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleFilterChange}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="📅 Start Date"
          className="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="📅 End Date"
          className="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="📊 Min Score"
          className="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
        <input
          type="number"
          placeholder="📊 Max Score"
          className="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
        />
        <select
          value={retentionCategory}
          onChange={(e) => setRetentionCategory(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
        >
          <option value="">🔄 All Categories</option>
          <option value="High">🟢 High Retention</option>
          <option value="Medium">🟡 Medium Retention</option>
          <option value="Low">🔴 Low Retention</option>
        </select>
        <button
          onClick={handleFilterChange}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition w-full cursor-pointer"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      {/* User Table */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-max rounded-lg border border-gray-700">
          <table className="w-full bg-gray-800 rounded-lg shadow-md text-sm lg:text-base">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="p-3 text-left whitespace-nowrap">👤 Name</th>
                <th className="p-3 text-left whitespace-nowrap">📧 Email</th>
                <th className="p-3 text-left whitespace-nowrap">
                  📅 Last Login
                </th>
                <th className="p-3 text-left whitespace-nowrap">
                  📊 Engagement Score
                </th>
                <th className="p-3 text-left whitespace-nowrap">
                  🔄 Retention Category
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users?.map((user) => (
                  <tr
                    key={user.email}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-white max-w-xs truncate">
                      {user.name}
                    </td>
                    <td className="p-3 text-gray-300 max-w-xs break-words">
                      {user.email}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-gray-200">
                      {user.engagementScore}
                    </td>
                    <td
                      className={`p-3 font-bold ${
                        user.retentionCategory === "High"
                          ? "text-green-400"
                          : user.retentionCategory === "Medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.retentionCategory}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { UserTable };
