// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Results'; 
import Feedback from './components/Feedback'; 
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} /> 
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

export default App;