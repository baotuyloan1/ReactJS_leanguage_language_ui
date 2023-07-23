import axios from "axios";
import {API_AUTH} from "../components/baseUrl";

const instance = axios.create({
    baseURL: API_AUTH,
    withCredentials: true,
});

export const signIn = (account) => {
    return instance.post("/sign-in", account);
};
