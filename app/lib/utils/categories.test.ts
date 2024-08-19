import {
  getSubjectWithCategory,
  flattenCategories,
  buildGroupedSubjects,
} from "./categories";

import { TCategory } from "@/app/types";
import { describe, expect, it, test } from "@jest/globals";

const mockCategories: TCategory[] = [
  {
    category: "Economics",
    subjects: [
      {
        abbreviation: "econ.EM",
        full_name: "Econometrics",
        description:
          "Econometric Theory, Micro-Econometrics, Macro-Econometrics, Empirical Content of Economic Relations discovered via New Methods, Methodological Aspects of the Application of Statistical Inference to Economic Data.",
      },
      {
        abbreviation: "econ.GN",
        full_name: "General Economics",
        description:
          "General methodological, applied, and empirical contributions to economics.",
      },
      {
        abbreviation: "econ.TH",
        full_name: "Theoretical Economics",
        description:
          "Includes theoretical contributions to Contract Theory, Decision Theory, Game Theory, General Equilibrium, Growth, Learning and Evolution, Macroeconomics, Market and Mechanism Design, and Social Choice.",
      },
    ],
  },
  {
    category: "Computer Science",
    subjects: [
      {
        abbreviation: "cs.AI",
        full_name: "Artificial Intelligence",
        description:
          "Artificial Intelligence covers resources concerning the automation of intelligent behavior.",
      },
      {
        abbreviation: "cs.CL",
        full_name: "Computation and Language",
        description:
          "Computation and Language covers resources concerning the use of computational techniques in the study of language and the human language faculty.",
      },
      {
        abbreviation: "cs.CC",
        full_name: "Computational Complexity",
        description:
          "Computational Complexity covers resources concerning the study of the intrinsic difficulty of computational problems.",
      },
    ],
  },
];

describe("getSubjectWithCategory", () => {
  it("should return the subject with the correct category for a valid abbreviation", () => {
    const result = getSubjectWithCategory("econ.EM");
    expect(result).toEqual({
      abbreviation: "econ.EM",
      full_name: "Econometrics",
      description:
        "Econometric Theory, Micro-Econometrics, Macro-Econometrics, Empirical Content of Economic Relations discovered via New Methods, Methodological Aspects of the Application of Statistical Inference to Economic Data.",
      category: "Economics",
    });
  });

  it("should return undefined for an invalid abbreviation", () => {
    const result = getSubjectWithCategory("unknown");
    expect(result).toBeUndefined();
  });
});

describe("flattenCategories", () => {
  it("should return a flattened array of subjects with their categories", () => {
    const result = flattenCategories(mockCategories);
    expect(result).toEqual([
      {
        abbreviation: "econ.EM",
        full_name: "Econometrics",
        description:
          "Econometric Theory, Micro-Econometrics, Macro-Econometrics, Empirical Content of Economic Relations discovered via New Methods, Methodological Aspects of the Application of Statistical Inference to Economic Data.",
        category: "Economics",
      },
      {
        abbreviation: "econ.GN",
        full_name: "General Economics",
        description:
          "General methodological, applied, and empirical contributions to economics.",
        category: "Economics",
      },
      {
        abbreviation: "econ.TH",
        full_name: "Theoretical Economics",
        description:
          "Includes theoretical contributions to Contract Theory, Decision Theory, Game Theory, General Equilibrium, Growth, Learning and Evolution, Macroeconomics, Market and Mechanism Design, and Social Choice.",
        category: "Economics",
      },
      {
        abbreviation: "cs.AI",
        full_name: "Artificial Intelligence",
        description:
          "Artificial Intelligence covers resources concerning the automation of intelligent behavior.",
        category: "Computer Science",
      },
      {
        abbreviation: "cs.CL",
        full_name: "Computation and Language",
        description:
          "Computation and Language covers resources concerning the use of computational techniques in the study of language and the human language faculty.",
        category: "Computer Science",
      },
      {
        abbreviation: "cs.CC",
        full_name: "Computational Complexity",
        description:
          "Computational Complexity covers resources concerning the study of the intrinsic difficulty of computational problems.",
        category: "Computer Science",
      },
    ]);
  });
});

describe("buildGroupedSubjects", () => {
  it("should return an array of grouped subjects by category", () => {
    const result = buildGroupedSubjects(mockCategories);
    expect(result).toEqual([
      {
        label: "Economics",
        options: [
          { value: "econ.EM", label: "econ.EM (Econometrics)" },
          { value: "econ.GN", label: "econ.GN (General Economics)" },
          { value: "econ.TH", label: "econ.TH (Theoretical Economics)" },
        ],
      },
      {
        label: "Computer Science",
        options: [
          { value: "cs.AI", label: "cs.AI (Artificial Intelligence)" },
          { value: "cs.CL", label: "cs.CL (Computation and Language)" },
          { value: "cs.CC", label: "cs.CC (Computational Complexity)" },
        ],
      },
    ]);
  });
});
