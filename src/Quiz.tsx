import React, { useEffect, useState } from 'react';
import Question from './Question';
import './Quiz.css';

interface QuizData {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Quiz: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const totalQuestionsToFetch = 10;

  useEffect(() => {
    const fetchQuestionsByCategory = async (category: string) => {
      const response = await fetch(`/${category}.json`);
      const data: QuizData[] = await response.json();
      return data;
    };

    const loadQuestions = async () => {
      const disabilitiesQuestions = await fetchQuestionsByCategory('Disabilities');
      const toolsQuestions = await fetchQuestionsByCategory('Tools');
      const lawsAndStandardsQuestions = await fetchQuestionsByCategory('LawsAndStandards');

      const disabilitiesCount = Math.floor(totalQuestionsToFetch * 0.4);
      const toolsCount = Math.floor(totalQuestionsToFetch * 0.4);
      const lawsAndStandardsCount = totalQuestionsToFetch - (disabilitiesCount + toolsCount);

      const selectedQuestions: QuizData[] = [
        ...selectRandomQuestions(disabilitiesQuestions, disabilitiesCount),
        ...selectRandomQuestions(toolsQuestions, toolsCount),
        ...selectRandomQuestions(lawsAndStandardsQuestions, lawsAndStandardsCount),
      ];

      setQuizData(selectedQuestions);
    };

    loadQuestions().catch((error) => console.error('Error loading questions:', error));
  }, []);

  function selectRandomQuestions<T>(array: T[], count: number): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements at i and j
    }
    return shuffled.slice(0, count);;
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
  };

  return (
    <div>
      <h1>CPACC Training Quiz</h1>
      {quizData.map((questionData, index) => (
        <Question
          key={index}
          question={questionData.question}
          options={questionData.options}
          correctAnswer={questionData.correctAnswer}
          onAnswer={handleAnswer}
        />
      ))}
      <p>Number of Correct Answers: {correctAnswers}/{totalQuestionsToFetch}</p>
    </div>
  );
};

export default Quiz;
