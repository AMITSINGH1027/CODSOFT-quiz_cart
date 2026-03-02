import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Manage Quizzes", path: "/admin/quizzes" },
    { name: "Results Analytics", path: "/admin/results" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">

      <h2 className="text-2xl font-bold mb-10 text-pink-400">
        QuizCart Admin
      </h2>

      {menu.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`text-left mb-4 p-2 rounded transition ${
            location.pathname === item.path
              ? "bg-pink-500"
              : "hover:bg-slate-700"
          }`}
        >
          {item.name}
        </button>
      ))}

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        className="mt-auto text-red-400 hover:text-red-500"
      >
        Logout
      </button>

    </div>
  );
}

export default AdminSidebar;