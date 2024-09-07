import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const Quiz = () => {
  const { quizzes, currentQuizIndex, handleAnswer } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (quizzes.length > 0) {
      setIsLoading(false);
    }
  }, [quizzes]);

  return (
    <div className='quiz'>
      {isLoading ? (
        <div className='loading'>Loading quiz...</div>
      ) : (
        currentQuizIndex < 5 && (
          <div className='quiz-question'>
            <h2>{quizzes[currentQuizIndex].text}</h2>
            {quizzes[currentQuizIndex].options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;