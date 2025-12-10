import axios from 'axios';
const url = "https://preguntados-api.vercel.app/api";

const getDifficulties = () => {
    return axios.get(`${url}/difficulty`);
};

const getQuestions = (difficulty) => {
    return axios.get(`${url}/questions?difficulty=${difficulty}`);
};

const getAnswers = (questionId, option) => {
    return axios.post(`${url}/answer`, {
        questionId: questionId,
        option: option
    });
}   ;

export { getDifficulties, getQuestions, getAnswers };
