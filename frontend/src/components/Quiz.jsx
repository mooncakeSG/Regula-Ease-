import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_CATEGORIES = [
  { key: 'registration', label: 'Business Registration' },
  { key: 'tax', label: 'Tax & Finance' },
  { key: 'hr', label: 'HR & Labor' },
  { key: 'legal', label: 'Legal & Compliance' },
  { key: 'general', label: 'General Knowledge' },
  { key: 'mixed', label: 'Mixed (All Categories)' }
];

const QUIZ_QUESTIONS = {
  registration: [
    {
      id: 1,
      question: 'What is the first step when starting a business in South Africa?',
      options: [
        'Opening a bank account',
        'Registering with CIPC (Companies and Intellectual Property Commission)',
        'Getting a tax number',
        'Hiring employees'
      ],
      correct: 1,
      explanation: 'Business registration with CIPC is the foundational step that enables all other business activities.'
    },
    {
      id: 2,
      question: 'Which document is required for VAT registration with SARS?',
      options: [
        'Employee contracts',
        'Municipal permit',
        'CIPC registration certificate',
        'Insurance policy'
      ],
      correct: 2,
      explanation: 'SARS requires your CIPC registration certificate as proof of business registration before you can register for VAT.'
    },
    {
      id: 3,
      question: 'How much does it typically cost to register a business with CIPC?',
      options: [
        'Free',
        'R50 - R100',
        'R175 - R500',
        'R1000+'
      ],
      correct: 2,
      explanation: 'CIPC registration costs typically range from R175 to R500 depending on the type of business entity.'
    }
  ],
  tax: [
    {
      id: 4,
      question: 'What is the standard VAT rate in South Africa?',
      options: [
        '10%',
        '12%',
        '15%',
        '20%'
      ],
      correct: 2,
      explanation: 'The standard VAT rate in South Africa is 15%.'
    },
    {
      id: 5,
      question: 'Which entity is responsible for collecting taxes from businesses?',
      options: [
        'CIPC',
        'SARS',
        'UIF',
        'SEDA'
      ],
      correct: 1,
      explanation: 'SARS (South African Revenue Service) is responsible for tax collection.'
    },
    {
      id: 6,
      question: 'What is the deadline for annual tax returns for companies?',
      options: [
        'End of March',
        '12 months after financial year-end',
        'End of December',
        'Within 6 months of registration'
      ],
      correct: 1,
      explanation: 'Companies must submit annual tax returns within 12 months after their financial year-end.'
    }
  ],
  hr: [
    {
      id: 7,
      question: 'What does UIF stand for?',
      options: [
        'Universal Income Fund',
        'Unemployment Insurance Fund',
        'Unified Investment Framework',
        'Urban Infrastructure Fund'
      ],
      correct: 1,
      explanation: 'UIF (Unemployment Insurance Fund) provides financial assistance to workers who lose their jobs or cannot work due to illness or maternity.'
    },
    {
      id: 8,
      question: 'Which document must be provided to employees upon hiring?',
      options: [
        'Employment contract',
        'Tax clearance certificate',
        'BEE certificate',
        'CIPC registration'
      ],
      correct: 0,
      explanation: 'An employment contract is a legal requirement for all employees.'
    },
    {
      id: 9,
      question: 'What is the minimum wage in South Africa (2024)?',
      options: [
        'R15/hour',
        'R23.19/hour',
        'R30/hour',
        'R50/hour'
      ],
      correct: 1,
      explanation: 'The national minimum wage is R23.19 per hour as of 2024.'
    }
  ],
  legal: [
    {
      id: 10,
      question: 'What does POPIA stand for?',
      options: [
        'Public Office Protection Information Act',
        'Protection of Personal Information Act',
        'Private Organization Policy Information Act',
        'Professional Office Privacy Implementation Act'
      ],
      correct: 1,
      explanation: 'POPIA (Protection of Personal Information Act) regulates how businesses collect, store, and use personal information.'
    },
    {
      id: 11,
      question: 'Which law governs Black Economic Empowerment (BEE)?',
      options: [
        'BEE Act',
        'Employment Equity Act',
        'Companies Act',
        'Labour Relations Act'
      ],
      correct: 0,
      explanation: 'The BEE Act governs Black Economic Empowerment in South Africa.'
    },
    {
      id: 12,
      question: 'Which document is NOT required for business insurance?',
      options: [
        'CIPC registration',
        'Tax clearance certificate',
        'Proof of address',
        'UIF registration'
      ],
      correct: 3,
      explanation: 'UIF registration is not required for business insurance.'
    }
  ],
  general: [
    {
      id: 13,
      question: 'Which government agency helps small businesses with funding and advice?',
      options: [
        'SARS',
        'SEDA',
        'CIPC',
        'UIF'
      ],
      correct: 1,
      explanation: 'SEDA (Small Enterprise Development Agency) supports small businesses.'
    },
    {
      id: 14,
      question: 'What is the main benefit of registering for VAT?',
      options: [
        'Lower taxes',
        'Access to government tenders',
        'Ability to claim input VAT',
        'No need to file tax returns'
      ],
      correct: 2,
      explanation: 'Registering for VAT allows businesses to claim input VAT on purchases.'
    },
    {
      id: 15,
      question: 'Which of the following is a legal business structure in South Africa?',
      options: [
        'Sole Proprietor',
        'Partnership',
        'Private Company (Pty) Ltd',
        'All of the above'
      ],
      correct: 3,
      explanation: 'All listed structures are legal business types in South Africa.'
    }
  ]
};

function getMixedQuestions() {
  // Pick 2 random questions from each category for a mixed quiz
  const all = Object.keys(QUIZ_QUESTIONS).filter(k => k !== 'mixed').flatMap(k => QUIZ_QUESTIONS[k]);
  return all.sort(() => 0.5 - Math.random()).slice(0, 10);
}

const Quiz = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const nextBtnRef = useRef();

  // Category selection
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResults(false);
    setError('');
    setSelectedAnswer('');
    if (category === 'mixed') {
      setQuestions(getMixedQuestions());
    } else {
      setQuestions(QUIZ_QUESTIONS[category] || []);
    }
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setError('');
  };

  // Simulate quiz data load error (for demonstration, you can replace with real fetch logic)
  useEffect(() => {
    if (quizStarted && questions.length === 0) {
      setTimeout(() => {
        setLoadError('Unable to load quiz. Please refresh or try again later.');
      }, 500);
    } else {
      setLoadError('');
    }
  }, [quizStarted, questions]);

  const retryLoad = () => {
    setLoadError('');
    setQuizStarted(false);
    setCategory('');
  };

  // Prevent double submissions/rapid clicks
  const nextQuestion = async () => {
    if (submitting) return;
    if (selectedAnswer === '') {
      setError('Please select an answer to continue.');
      return;
    }
    setSubmitting(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newAnswers = [...answers, {
      questionId: questions[currentQuestion].id,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct,
      isCorrect
    }];
    setAnswers(newAnswers);
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setError('');
        setSubmitting(false);
      }, 300);
    } else {
      setShowResults(true);
      await saveQuizResults(newAnswers, score + (isCorrect ? 1 : 0));
      setSubmitting(false);
    }
  };

  const saveQuizResults = async (finalAnswers, finalScore) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const results = {
        score: finalScore,
        totalQuestions: questions.length,
        answers: finalAnswers,
        completedAt: new Date().toISOString(),
        category
      };
      localStorage.setItem('regulaease-quiz-results', JSON.stringify(results));
    } catch (error) {
      setError('Score could not be saved. Retrying...');
      console.error('Failed to save quiz results:', error);
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
    setAnswers([]);
    setError('');
    setCategory('');
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of SA business compliance.';
    if (percentage >= 60) return 'Good job! You have a solid foundation but could benefit from more learning.';
    if (percentage >= 40) return 'Not bad, but there\'s room for improvement. Consider reviewing our resources.';
    return 'You might want to explore our compliance checklist and skills development sections.';
  };

  // Warn if user tries to leave mid-quiz
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (quizStarted && !showResults) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [quizStarted, showResults]);

  // Category selection screen
  if (!quizStarted) {
    return (
      <motion.div className="quiz-container max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white rounded-2xl p-8 mb-8">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl font-bold mb-4">Business Compliance Quiz</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Test your knowledge of South African business compliance and regulations. Select a category to begin.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {QUIZ_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`rounded-xl p-6 border-2 font-semibold text-lg transition-all duration-200 mb-2 ${category === cat.key ? 'bg-primary-blue text-white border-primary-blue' : 'bg-white dark:bg-neutral-gray-dark text-neutral-black dark:text-neutral-white border-neutral-gray-light dark:border-neutral-gray-medium hover:bg-primary-blue/10 dark:hover:bg-primary-blue/20'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <motion.button
            onClick={startQuiz}
            className="bg-primary-blue hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!category}
          >
            Start Quiz
          </motion.button>
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-2 rounded-md mt-4 max-w-lg mx-auto">
              {error}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Quiz data load error
  if (loadError) {
    return (
      <div className="max-w-xl mx-auto mt-12">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-md flex flex-col items-center">
          <span className="mb-2">{loadError}</span>
          <button
            onClick={retryLoad}
            className="bg-primary-blue text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <motion.div 
        className="quiz-container max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-neutral-black dark:text-neutral-white mb-4">
            Quiz Completed!
          </h2>
          <div className={`text-5xl font-bold mb-4 ${getScoreColor(percentage)}`}>
            {score}/{questions.length}
          </div>
          <div className={`text-2xl font-semibold mb-4 ${getScoreColor(percentage)}`}>
            {percentage}% Score
          </div>
          <p className="text-neutral-gray-medium dark:text-neutral-white/80 text-lg max-w-2xl mx-auto mb-8">
            {getScoreMessage(percentage)}
          </p>

          {loading && (
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-md mb-4">
              Saving your results...
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-2 rounded-md mb-4">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-neutral-black dark:text-neutral-white mb-4">
            Review Your Answers
          </h3>
          
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            return (
              <div key={question.id} className="bg-white dark:bg-neutral-gray-dark rounded-xl p-6 border border-neutral-gray-light dark:border-neutral-gray-medium">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    userAnswer?.isCorrect 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {userAnswer?.isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-black dark:text-neutral-white mb-2">
                      {question.question}
                    </h4>
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded-lg text-sm ${
                            optionIndex === question.correct
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-medium'
                              : optionIndex === userAnswer?.selected && optionIndex !== question.correct
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-neutral-gray-light dark:bg-neutral-gray-medium text-neutral-gray-dark dark:text-neutral-white'
                          }`}
                        >
                          {option}
                          {optionIndex === question.correct && ' ✓ (Correct)'}
                          {optionIndex === userAnswer?.selected && optionIndex !== question.correct && ' (Your answer)'}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-gray-medium dark:text-neutral-white/70 italic">
                      💡 {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <motion.button
            onClick={restartQuiz}
            className="bg-primary-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take Quiz Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="quiz-container max-w-3xl mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-gray-medium dark:text-neutral-white/70">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-neutral-gray-medium dark:text-neutral-white/70">
            Score: {score}/{currentQuestion + 1}
          </span>
        </div>
        <div className="w-full bg-neutral-gray-light dark:bg-neutral-gray-medium rounded-full h-2">
          <div 
            className="bg-primary-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-neutral-gray-dark rounded-xl p-8 border border-neutral-gray-light dark:border-neutral-gray-medium mb-6">
        <h2 className="text-xl font-semibold text-neutral-black dark:text-neutral-white mb-6">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => selectAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-primary-blue bg-blue-50 dark:bg-blue-900/20 text-primary-blue'
                  : 'border-neutral-gray-light dark:border-neutral-gray-medium bg-white dark:bg-neutral-gray-dark text-neutral-black dark:text-neutral-white hover:border-primary-blue/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-primary-blue bg-primary-blue'
                    : 'border-neutral-gray-medium dark:border-neutral-gray-light'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex justify-between items-start">
            <span>{error}</span>
            <button onClick={() => setError('')} className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={restartQuiz}
          className="text-neutral-gray-medium dark:text-neutral-white/70 hover:text-neutral-black dark:hover:text-neutral-white transition-colors duration-200"
        >
          Exit Quiz
        </button>
        
        <motion.button
          ref={nextBtnRef}
          onClick={nextQuestion}
          disabled={selectedAnswer === '' || submitting}
          className={`py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            selectedAnswer === '' || submitting
              ? 'bg-neutral-gray-light dark:bg-neutral-gray-medium text-neutral-gray-medium dark:text-neutral-gray-light cursor-not-allowed'
              : 'bg-primary-blue hover:bg-blue-700 text-white'
          }`}
          whileHover={selectedAnswer !== '' && !submitting ? { scale: 1.05 } : {}}
          whileTap={selectedAnswer !== '' && !submitting ? { scale: 0.95 } : {}}
        >
          {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Quiz; 