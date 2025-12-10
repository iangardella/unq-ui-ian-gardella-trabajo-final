import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { useQuestion } from '../context/QuestionProvider'
import { getDifficulties, getQuestions, getAnswers } from '../service/apiService';

export const Quiz = () => {

    const { setDifficulty, difficulty, rightQuestions, setRightQuestions } = useQuestion();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [difficulties, setDifficulties] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answerResult, setAnswerResult] = useState(null);


    useEffect(() => {
        setLoading(true);
        setRightQuestions(0); 
        getDifficulties()
            .then(res => res.json())
            .then(data => {
                setDifficulties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSelectDifficulty = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
        setLoading(true);
        
        setRightQuestions(0); 

        getQuestions(selectedDifficulty)
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                setGameStarted(true);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    const handleAnswer = (optionKey) => {
        if (answered) return;

        setLoading(true);
        const currentQ = questions[currentQuestionIndex];

        getAnswers(currentQ.id, optionKey)
            .then(res => res.json())
            .then(data => {
                setAnswerResult(data.answer);
                setSelectedOption(optionKey);
                setAnswered(true);
                if (data.answer) {
                    setRightQuestions(prev => prev + 1);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setAnswered(false);
            setSelectedOption(null);
            setAnswerResult(null);
        } else {
            setGameOver(true);
        }
    };

    const handlePlayAgain = () => {
        setGameStarted(false);      
        setGameOver(false);         
        setCurrentQuestionIndex(0); 
        setQuestions([]);           
        setRightQuestions(0);       
        setAnswered(false);         
        setSelectedOption(null);
        setAnswerResult(null);
    };

    const getOptionClass = (optionKey) => {
        if (!answered) return "";
        if (selectedOption === optionKey) {
            return answerResult ? "correct" : "incorrect";
        }
        return "";
    };


    if (loading) return <div className='container'><h1>Cargando...</h1></div>;
    if (gameOver) {
        return (
            <div className='container'>
                <h1>¡Juego Terminado!</h1>
                <hr />
                <h2 style={{textAlign: 'center', fontSize: '30px', margin: '20px 0'}}>
                    Acertaste {rightQuestions} de {questions.length}
                </h2>
                <p style={{textAlign: 'center', fontSize: '20px', marginBottom: '30px'}}>
                    {rightQuestions === questions.length ? "¡Al Toke Rey!" : 
                     rightQuestions > 0 ? "¡Buen intento Wachin!" : "A estudiar más...Wachin📚"}
                </p>
                <button onClick={handlePlayAgain}>Volver a Jugar</button>
            </div>
        )
    }

    if (!gameStarted) {
        return (
            <div className='container'>
                <h1>Preguntados</h1>
                <hr />
                <h2>Selecciona una dificultad</h2>
                <ul>
                    {difficulties.map((diff, index) => (
                        <li key={index} onClick={() => handleSelectDifficulty(diff)}>
                             {typeof diff === 'string' ? diff.toUpperCase() : diff}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    if (questions.length === 0) return <div className='container'><h1>No hay preguntas.</h1></div>;

    const currentQuestionData = questions[currentQuestionIndex];

    return (
        <div className='container'>
            <h1>Quiz - {difficulty.toUpperCase()}</h1>
            <hr />
            <h2>{currentQuestionData.question}</h2>
            
            <ul className={answered ? "disabled-options" : ""}>
                <li className={getOptionClass("option1")} onClick={() => handleAnswer("option1")}>
                    {currentQuestionData.option1}
                </li>
                <li className={getOptionClass("option2")} onClick={() => handleAnswer("option2")}>
                    {currentQuestionData.option2}
                </li>
                <li className={getOptionClass("option3")} onClick={() => handleAnswer("option3")}>
                    {currentQuestionData.option3}
                </li>
                <li className={getOptionClass("option4")} onClick={() => handleAnswer("option4")}>
                    {currentQuestionData.option4}
                </li>
            </ul>

            <button onClick={handleNextQuestion} disabled={!answered}>
                {currentQuestionIndex === questions.length - 1 ? "Ver Resultados" : "Siguiente"}
            </button>
            
            <div className='index'>
                {currentQuestionIndex + 1} of {questions.length} Questions
            </div>
        </div>
    )
}