// src/components/Result.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const URL = "https://quiz-ai-backend.onrender.com"

  const score = location.state.score;

  const restartQuiz = () => {
    navigate('/quiz');
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.post(`${URL}/api/feedback`, { score });
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchFeedback();
  }, [score]);

  return (
    <div>
      <h1>Your Score: {score} out of 5</h1>
      <h2>Feedback:</h2>
      <p>{feedback}</p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Result;