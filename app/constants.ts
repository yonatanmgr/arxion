import { MathJax3Config } from "better-react-mathjax";

export const MATHJAX_CONFIG: MathJax3Config = {
  loader: { load: ["[tex]/html", "[tex]/unicode", "[tex]/ams"] },
  tex: {
    packages: { "[+]": ["html", "unicode", "ams"] },

    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

export const AUTHOR_LIMIT = 3;

export const RESULT_LIMIT = 25;
