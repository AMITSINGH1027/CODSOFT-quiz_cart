import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login3d.png";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Account Created Successfully!");
      navigate("/login");
    } catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.error || err.response?.data?.message || "Registration failed");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 p-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 p-12 flex flex-col justify-center">

          <h1 className="text-pink-400 font-semibold text-xl mb-4">
            Logo Here
          </h1>

          <p className="text-gray-500 mb-2">Create your account</p>

          <h2 className="text-4xl font-bold mb-8">Sign Up</h2>

          <form onSubmit={handleRegister} className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full bg-pink-400 hover:bg-pink-500 transition text-white py-3 rounded-full font-semibold shadow-md">
              SIGN UP →
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-400 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 relative bg-[#dbeafe] flex items-center justify-center rounded-r-3xl overflow-hidden">

          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-200 rounded-bl-[150px]"></div>
          <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

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

export default Register;