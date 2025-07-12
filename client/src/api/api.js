import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.BACKEND_URL,
    withCredentials: true,
})

export default API;