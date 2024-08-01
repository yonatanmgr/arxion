import axios from "axios";

export const client = axios.create({
  baseURL: "http://export.arxiv.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});
