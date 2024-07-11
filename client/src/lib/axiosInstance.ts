import axios from "axios";
import { IAxiosConfig } from "../types/lib.interfaces";

const AxiosInstance = (config: IAxiosConfig) =>
  axios({
    baseURL: process.env.REACT_APP_API_URL,
    url: config.url,
    method: config.method,
    headers: config.headers,
    params: config.params,
    data: config.data,
  });

export default AxiosInstance;
