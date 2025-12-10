import { createContext, useContext, useState }  from "react";

export const QuestionContext = createContext(
    {
        totalQuestion: 0,
        rightQuestions: 0,
        currentQuestion: 0,
        difficulty: 'easy',
        setRightQuestions: () => {},
        setTotalQuestion: () => {},
        setcurrentQuestion: () => {},
        setDifficulty: () => {},
    }
);

export const QuestionProvider = ({ children }) => {
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [rightQuestions, setRightQuestions] = useState(0);
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [difficulty, setDifficulty] = useState('easy');
    return (
        <QuestionContext.Provider value={{
            totalQuestion: totalQuestion,
            setTotalQuestion: setTotalQuestion,
            rightQuestions: rightQuestions,
            setRightQuestions: setRightQuestions,
            currentQuestion: currentQuestion,
            setcurrentQuestion: setcurrentQuestion,
            difficulty: difficulty,
            setDifficulty: setDifficulty,
        }}>
            {children}
        </QuestionContext.Provider>
    );
}
export const useQuestion = () => useContext(QuestionContext);
