'use client';

import { useState, useEffect } from 'react';

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

export default function NPCQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // Fetch questions from the JSON file
    fetch('/npc-quiz/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          {questions.length > 0 && (
            <div className="question-section">
              <div className="question-text">
                {questions[currentQuestionIndex].question}
              </div>
              <div className="answer-section">
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer.isCorrect)}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}