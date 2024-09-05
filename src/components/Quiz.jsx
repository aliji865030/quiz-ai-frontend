// Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const URL = "https://quiz-ai-backend.onrender.com"

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get(`${URL}/api/quizzes`);
      const shuffledQuizzes = res.data.sort(() => Math.random() - 0.5).slice(0, 5);
      setQuizzes(shuffledQuizzes);
    };
    fetchQuizzes();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === quizzes[currentQuizIndex].correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  useEffect(() => {
    if (currentQuizIndex === 5) {
      navigate('/result', { state: { score } });
    }
  }, [currentQuizIndex, navigate, score]);

  return (
    <div>
      {quizzes.length > 0 && currentQuizIndex < 5 && (
        <div>
          <h2>{quizzes[currentQuizIndex].text}</h2>
          {quizzes[currentQuizIndex].options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;