import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Exam() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    API.get("/exam/start", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      setQuestions(res.data);
    });
  }, []);

  // Submit answers
  const handleSubmit = useCallback(async () => {
    const formattedAnswers = Object.entries(answers).map(([id, selectedIndex]) => ({
      id,
      selectedIndex,
    }));
    const res = await API.post(
      "/exam/submit",
      { answers: formattedAnswers },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    navigate("/result", { state: { score: res.data.score } });
  }, [answers, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  // Handle option select
  const handleSelect = (qid, index) => {
    setAnswers((prev) => ({ ...prev, [qid]: index }));
  };

  if (!questions.length) return <p className="text-center mt-10">Loading questions...</p>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentQ = questions[current];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📝 Exam</h2>
          <div className="font-mono text-lg bg-gray-200 px-4 py-2 rounded-lg shadow">
            ⏳ {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold mb-4">
          {current + 1}. {currentQ.question}
        </h3>
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, i) => (
            <label
              key={i}
              className={`block p-3 rounded-lg border cursor-pointer transition ${
                answers[currentQ.id] === i
                  ? "bg-blue-100 border-blue-500 shadow-md"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name={`q-${currentQ.id}`}
                className="hidden"
                onChange={() => handleSelect(currentQ.id, i)}
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
          >
            ← Previous
          </button>
          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Exam;
