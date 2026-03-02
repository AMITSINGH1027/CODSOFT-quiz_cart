import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null;

  return (
<div className="flex justify-between items-center px-12 py-6 bg-slate-900 border-b border-slate-700">
  <h2 className="text-2xl font-semibold text-indigo-400 tracking-wide">
    QuizCart
  </h2>

  <div className="flex gap-8 items-center text-slate-300">
    <Link to="/quizzes" className="hover:text-white transition">
      Quizzes
    </Link>
    {role === "admin" && (
  <button
    onClick={() => navigate("/admin")}
    className="bg-red-500 px-4 py-2 rounded text-white ml-4"
  >
    Admin Dashboard
  </button>
)}
    <Link to="/results" className="hover:text-white transition">
      Results
    </Link>
    <Link to="/create">Create Quiz</Link>
    <button
      onClick={handleLogout}
      className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition"
    >
      Logout
    </button>
  </div>
</div>
  );
}

export default Navbar;