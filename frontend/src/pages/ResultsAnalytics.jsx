import { useEffect, useState } from "react";
import axios from "axios";

function ResultsAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch (err) {
        console.log("Analytics error:", err.response?.data);
      }
    };

    fetchAnalytics();
  }, []);

  if (!data) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Results Analytics</h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl">
          <h3>Total Users</h3>
          <p className="text-2xl">{data.totalUsers}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3>Total Quizzes</h3>
          <p className="text-2xl">{data.totalQuizzes}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3>Total Attempts</h3>
          <p className="text-2xl">{data.totalAttempts}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h3>Average Score</h3>
          <p className="text-2xl">{data.avgScore}%</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Top Users</h3>

      <div className="bg-slate-900 rounded-xl p-4">
        {data.topUsers.map((user, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-gray-700 py-2"
          >
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.avgScore !== null && user.avgScore !== undefined
          ? Number(user.avgScore).toFixed(2)
          : "0.00"}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsAnalytics;