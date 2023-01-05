import axios from "axios";
export const appAxios = axios.create({
    baseURL: "http://netflixclonebackend-env.eba-ixpktzqd.us-east-1.elasticbeanstalk.com"
})