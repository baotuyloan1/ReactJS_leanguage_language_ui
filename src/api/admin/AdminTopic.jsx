import axios from "axios";
import {API_ADMIN_TOPICS} from "../../components/baseUrl";

const instance = axios.create({
    baseURL: API_ADMIN_TOPICS,
    withCredentials: true,
});

export const adminGetTopics = () => {
    return instance.get("");
};


export const adminCreateTopic = (topic) => {
    return instance.post("", topic, {headers: {"Content-Type": "multipart/form-data"}});
};
