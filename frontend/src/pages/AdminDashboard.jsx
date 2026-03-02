import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h2 className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4">

        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card title="Total Users" value={stats.totalUsers} color="text-indigo-600" />
        <Card title="Total Quizzes" value={stats.totalQuizzes} color="text-green-600" />
        <Card title="Total Attempts" value={stats.totalAttempts} color="text-pink-600" />
        <Card title="Average Score" value={`${stats.avgPercentage}%`} color="text-yellow-500" />

      </div>
    </AdminLayout>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h3>
    </div>
  );
}

export default AdminDashboard;