import { useEffect, useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const URL = "https://quiz-ai-backend.onrender.com"

  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await axios.get(`${URL}/api/feedback`);
      setFeedback(res.data);
    };
    fetchFeedback();
  }, []);

  return (
    <div className='feedback'>
      <h1>Feedback</h1>
      <p>{feedback}</p>
    </div>
  );
};

export default Feedback;