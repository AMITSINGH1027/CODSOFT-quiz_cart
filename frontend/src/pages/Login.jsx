import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login3d.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  { email, password }
);

          console.log("Login response:", res.data); // debug

localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
localStorage.setItem("email", res.data.email);

          console.log("Stored token:", localStorage.getItem("token"));

      navigate("/quizzes");

    } catch (err) {
      alert("Login Failed");
      console.log(err);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 p-4">

  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">

    {/* LEFT SIDE */}
    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

        <h1 className="text-pink-400 font-semibold text-xl mb-4">
          Logo Here
        </h1>

        <p className="text-gray-500 mb-2">Welcome back !!!</p>

        <h2 className="text-4xl font-bold mb-8">Log In</h2>

        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="login@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"              required
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-gray-600 mb-1">Password</label>
              <p className="text-sm text-right text-gray-400 text-sm mb-2">
  <span
    onClick={() => navigate("/forgot-password")}
    className="cursor-pointer hover:underline"
  >
    Forgot Password?
  </span>
</p>
            </div>

            <input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 transition text-white py-3 rounded-full font-semibold shadow-md"
          >
            LOGIN →
          </button>

        </form>

        <p className="text-sm text-gray-500 mt-6">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-pink-400 cursor-pointer hover:underline"
  >
    Sign up for free
  </span>
</p>

      </div>

      {/* RIGHT SIDE */}
<div className="w-full md:w-1/2 relative bg-[#dbeafe] flex items-center justify-center rounded-b-3xl md:rounded-b-none md:rounded-r-3xl overflow-hidden p-8">

  {/* Curved Background Shape */}
  <div className="absolute right-0 top-0 w-96 h-96 bg-blue-200 rounded-bl-[150px]"></div>

  {/* Soft Glow */}
  <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

  {/* 3D Image */}
  <img
    src={loginImage}
    alt="3D Illustration"
    className="relative z-10 w-[75%] drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
  />
</div>

    </div>
  </div>
);
}

export default Login;