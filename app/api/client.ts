import axios from "axios";
import rateLimit from "axios-rate-limit";

export const client = rateLimit(
  axios.create({
    baseURL: "https://export.arxiv.org/api",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  { maxRequests: 1, perMilliseconds: 3000 },
);
