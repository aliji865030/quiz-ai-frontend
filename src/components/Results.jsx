import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';

const Result = () => {
  const { score, feedback, restartQuiz } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (feedback !== '') {
      setIsLoading(false);
    }
  }, [feedback]);

  return (
    <div className='result'>
      {isLoading ? (
        <div className='loading'>Loading feedback...</div>
      ) : (
        <>
          <h1>Your Score: {score} out of 5</h1>
          <div className='feedback'>
            <h2>Feedback:</h2>
            <p>{feedback}</p>
          </div>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </>
      )}
    </div>
  );
};

export default Result;