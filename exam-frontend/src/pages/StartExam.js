import React from "react";
import { useNavigate } from "react-router-dom";

function StartExam() {
  const navigate = useNavigate();

  const startExam = () => {
    navigate("/exam");
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Exam Portal</h2>
      <p className="mb-6 text-gray-600">You have 30 minutes to complete the exam. Good luck!</p>
      <button
        onClick={startExam}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Start Exam
      </button>
    </div>
  );
}

export default StartExam;
