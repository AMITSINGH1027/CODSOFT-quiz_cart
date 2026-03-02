import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
await axios.get(
  `${import.meta.env.VITE_API_URL}/api/auth/verify/${token}`
);

        setMessage("✅ Email verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {
        setMessage("❌ Verification failed or token expired.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>
    </div>
  );
}

export default VerifyEmail;