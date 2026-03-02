import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      }
    ]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/quizzes",
        { title, description, questions },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Quiz Created Successfully!");
      navigate("/quizzes");

    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 text-white">
      <h2 className="text-3xl font-bold mb-8">Create Quiz</h2>

      <input
        className="w-full p-3 mb-4 rounded bg-slate-800"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-3 mb-8 rounded bg-slate-800"
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-10 bg-slate-800 p-6 rounded-xl">
          <h4 className="mb-4 font-semibold">
            Question {qIndex + 1}
          </h4>

          <input
            className="w-full p-2 mb-4 rounded bg-slate-700"
            placeholder="Enter Question"
            value={q.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
          />

          {q.options.map((opt, oIndex) => (
            <div key={oIndex} className="flex items-center mb-3">
              <input
                type="radio"
                name={`correct-${qIndex}`}
                checked={q.correctAnswer === oIndex}
                onChange={() =>
                  handleQuestionChange(qIndex, "correctAnswer", oIndex)
                }
                className="mr-3"
              />

              <input
                className="flex-1 p-2 rounded bg-slate-700"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ))}

<button
  onClick={addQuestion}
  className="btn-secondary mr-4"
>
  Add Question
</button>


<button
  onClick={handleSubmit}
  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition duration-200"
>
  Submit Quiz
</button>

    </div>
  );
}