import { useEffect, useState } from "react";
import axios from "axios";

function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");

const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/results/my`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setResults(res.data);
    };

    fetchResults();
  }, []);

  return (
<div className="container">
        <h2>My Results</h2>

      {results.map((r) => (
        <div key={r._id} style={{ marginBottom: "15px" }}>
          <h4>{r.quiz.title}</h4>
          <p>Score: {r.score} / {r.totalQuestions}</p>
          <p>Percentage: {r.percentage}</p>
        </div>
      ))}
    </div>
  );
}

export default MyResults;