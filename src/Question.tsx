import React, { useState } from 'react';
import './Question.css'; // Import the CSS file for this component

interface QuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    if (selectedOption === null) {
      setSelectedOption(option);
      const correct = option === correctAnswer;
      setIsCorrect(correct);
      onAnswer(correct); // Notify the parent component about the answer
    }
  };

  return (
    <div className="question-container"> {/* Apply the CSS class */}
      <h2 className="question">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`answer-option ${selectedOption === option ? (isCorrect ? 'correct-answer' : 'incorrect-answer') : ''}`}
          >
            {option}
          </li>
        ))}
      </ul>
      {selectedOption && (
        <p className={`answer-feedback ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
          {isCorrect ? 'Correct! 🎉' : 'Wrong answer. 😞'} The correct answer is: {correctAnswer}
        </p>
      )}
    </div>
  );
};

export default Question;
