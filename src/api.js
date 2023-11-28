import axios from "axios";

const api = axios.create({
    //baseURL: 'https://localhost:7119/api',
    baseURL: 'https://apisunsale.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;