import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/admin/quiz-analytics",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQuizzes(res.data);
    };

    fetchQuizzes();
  }, []);

  return (
    <AdminLayout>
      <div className="p-8 text-white">
        <h2 className="text-3xl text-black font-bold mb-8">📝 Manage Quizzes</h2>

        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-gray-300">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Questions</th>
                <th className="p-4">Attempts</th>
                <th className="p-4">Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz._id} className="border-b border-slate-700">
                  <td className="p-4">{quiz.title}</td>
                  <td className="p-4">{quiz.questions}</td>
                  <td className="p-4">{quiz.totalAttempts}</td>
                  <td className="p-4">{quiz.avgScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageQuizzes;