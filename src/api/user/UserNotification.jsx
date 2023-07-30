import axios from "axios";
import { API_USER_DEVICES } from "../../components/baseUrl";

const instance = axios.create({
  baseURL: API_USER_DEVICES,
  withCredentials: true,
});

export const userPostDeviceToken = (device) => instance.post(``, device);
