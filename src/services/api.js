import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://be-the-hero-ong.herokuapp.com/",
});

export default api;
