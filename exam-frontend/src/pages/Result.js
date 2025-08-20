// src/pages/Result.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const [pastResults, setPastResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/exam/results", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPastResults(res.data);
      } catch (err) {
        console.error("❌ Error fetching results:", err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          🎉 Exam Completed!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your Score:{" "}
          <span className="text-2xl font-bold text-blue-700">{score}</span>
        </p>

        {/* Past Results Section */}
        <div className="mt-6 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            📊 Your Past Attempts
          </h2>
          {pastResults.length === 0 ? (
            <p className="text-gray-500 text-sm">No past attempts yet.</p>
          ) : (
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {pastResults.map((r, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <span className="text-gray-700 font-medium">
                    Attempt {pastResults.length - i}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    {r.score} / 5
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(r.date).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/exam")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            🔄 Take Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow"
          >
            ⬅️ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
