import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 10000, // Optional timeout in ms
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
