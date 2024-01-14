import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-trello-practice.onrender.com/",
  withCredentials: true,
});

export default instance;
