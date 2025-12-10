const url = "https://preguntados-api.vercel.app/api";

const getDifficulties = () => {
    return fetch(`${url}/difficulty`);
};

const getQuestions = (difficulty) => {
    return fetch(`${url}/questions?difficulty=${difficulty}`);
};

const getAnswers = (questionId, option) => {
    return fetch(`${url}/answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            questionId: questionId, 
            option: option
        }),
    });
}   ;

export { getDifficulties, getQuestions, getAnswers };
