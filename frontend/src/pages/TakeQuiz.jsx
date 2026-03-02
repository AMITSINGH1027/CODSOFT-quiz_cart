import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/quizzes/${id}`
        );
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/quizzes/${id}/submit`,
  { answers },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      navigate("/result", { state: res.data });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Error submitting quiz");
    }
  };

  if (!quiz)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 p-6">

      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">
          {quiz.title}
        </h2>

        {quiz.questions.map((q, index) => (
          <div key={index} className="mb-10 bg-slate-800 p-6 rounded-2xl shadow-lg">

            <h4 className="text-lg md:text-xl font-semibold mb-6 text-white">
              {index + 1}. {q.questionText}
            </h4>

            <div className="space-y-4">
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className={`block p-4 rounded-xl cursor-pointer transition text-white ${
                    answers[index] === i
                      ? "bg-indigo-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={i}
                    checked={answers[index] === i}
                    onChange={() => handleOptionChange(index, i)}
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>

          </div>
        ))}

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-500 transition duration-200 shadow-md"
          >
            Submit Quiz
          </button>
        </div>

      </div>
    </div>
  );
}

export default TakeQuiz;