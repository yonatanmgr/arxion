import { MathJax3Config } from "better-react-mathjax";

export const MATHJAX_CONFIG: MathJax3Config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
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
