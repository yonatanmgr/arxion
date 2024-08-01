import axios from "axios";

export const client = axios.create({
  baseURL: "https://export.arxiv.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});
