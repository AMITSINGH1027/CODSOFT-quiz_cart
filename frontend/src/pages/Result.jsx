import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions, percentage } = location.state || {};
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const numericPercent = percentage ? parseInt(percentage) : 0;

  // Dynamic color
  let progressColor = "text-red-500";
  if (numericPercent >= 80) progressColor = "text-green-500";
  else if (numericPercent >= 50) progressColor = "text-yellow-400";

  // Animation
  useEffect(() => {
    if (!percentage) return;

    let current = 0;
    const target = parseInt(percentage);

    const interval = setInterval(() => {
      current += 1;
      setAnimatedPercent(current);
      if (current >= target) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [percentage]);

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 text-white">
        No Result Found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900">

      <div className="bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Quiz Result
        </h2>

        {/* Animated Percentage Circle */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-36 h-36">

            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="#1e293b"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={
                  2 * Math.PI * 60 -
                  (animatedPercent / 100) * (2 * Math.PI * 60)
                }
                className={`${progressColor} transition-all duration-300`}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${progressColor}`}>
                {animatedPercent}%
              </span>
            </div>

          </div>
        </div>

        <p className="text-white text-lg mb-2">
          Score: <span className="font-semibold">{score}</span>
        </p>

        <p className="text-white text-lg mb-8">
          Total Questions: <span className="font-semibold">{totalQuestions}</span>
        </p>

        <button
          onClick={() => navigate("/quizzes")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-500 transition duration-200 shadow-md"
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Result;