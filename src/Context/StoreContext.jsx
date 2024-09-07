import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const URL = "https://quiz-ai-backend.onrender.com";
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${URL}/api/quizzes`);
      const shuffledQuizzes = res.data.sort(() => Math.random() - 0.5).slice(0, 5);
      setQuizzes(shuffledQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.post(`${URL}/api/feedback`, { score });
      setFeedback(response.data.feedback);
      console.log(response);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleAnswer = (answer) => {
    if (answer === quizzes[currentQuizIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuizIndex === 4) {
      fetchFeedback();
      navigate("/result");
    } else {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setFeedback('');
    fetchQuizzes(); 
    setQuizzes("")
    navigate('/quiz');
  };

  useEffect(() => {
    fetchQuizzes(); 
  }, []);

  const contextValue = {
    URL,
    quizzes,
    setQuizzes,
    currentQuizIndex,
    setCurrentQuizIndex,
    score,
    setScore,
    handleAnswer,
    feedback,
    restartQuiz
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;