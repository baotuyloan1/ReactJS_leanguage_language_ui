import axios from "axios";
import {API_ADMIN_QUESTION} from "../../components/baseUrl";

const instance = axios.create({
    baseURL: API_ADMIN_QUESTION, withCredentials: true,
});


export const adminGetQuestions = () => {
    return instance.get("");
}

export const adminDeleteQuestionById = (id) => {
    return instance.delete(`${id}`)
}

export const adminCreateQuestion = (question) => {
    return instance.post("",question);
}