import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true //browser wil send the cookies automatically wiith every single request
})

export default axiosInstance;