import axios from "axios";
export const appAxios = axios.create({
    baseURL: "https://netflix-clone-api-ms-user.onrender.com"
})