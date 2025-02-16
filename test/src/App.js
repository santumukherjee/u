import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file for styling

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResult(true);
      return;
    }
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswer = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setShowAnswers(false);
    setTimeLeft(15 * 60);
  };

  return (
    <div className="app">
      <h1>React Quiz App</h1>
      <p>Current Time: {currentTime}</p>
      <p>Time Left: {formatTime(timeLeft)}</p>

      <div className="quiz-container">
        {showResult ? (
          <div>
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / {questions.length}</p>
            <button onClick={() => setShowAnswers(true)}>Show Answers</button>
            {showAnswers && (
              <div>
                {questions.map((q, index) => (
                  <div key={index}>
                    <h3>{q.question}</h3>
                    <p>Correct Answer: {q.answer}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={restartQuiz} className="restart-button">Restart Quiz</button>
          </div>
        ) : (
          <div>
            <h2>{questions[currentQuestion].question}</h2>
            
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedOption === option ? "selected" : ""}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* NEXT button placed on a new line */}
            <div className="next-button-container">
              <button onClick={handleAnswer} disabled={!selectedOption} className="next-button">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
