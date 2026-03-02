import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuizzes();
  }, []);

  return (

<div className="max-w-6xl mx-auto p-4 md:p-10">
    <h2 className="text-3xl font-bold mb-10">Available Quizzes</h2>

  {quizzes.map((quiz) => (
    <div
      key={quiz._id}
className="bg-slate-800 p-6 md:p-8 rounded-xl mb-6 shadow-lg hover:shadow-xl transition"    >
      <h3 className="text-xl font-semibold mb-2">
        {quiz.title}
      </h3>

      <p className="text-slate-400 mb-6">
        {quiz.description}
      </p>

<button
  onClick={() => navigate(`/quiz/${quiz._id}`)}
  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition duration-200"
>
  Submit Quiz
</button>

    </div>
  ))}
</div>
  );
}

export default QuizList;