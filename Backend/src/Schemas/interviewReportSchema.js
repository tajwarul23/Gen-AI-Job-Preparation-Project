import { z } from "zod";
// ─── Zod Schema (for validation after response) ───────────────────────────────
export const interviewReportSchema = z.object({
  title: z.string(),
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
});

// ─── Groq Native Schema (plain strings instead of SchemaType enum) ──────────

const questionSchema = {
  type: "object",
  properties: {
    question: { type: "string" },
    intention: { type: "string" },
    answer: { type: "string" },
  },
  required: ["question", "intention", "answer"],
  additionalProperties: false,
};

export const interviewReportGroqSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "The title of the job for which the interview report is generated",
    },
    matchScore: {
      type: "number",
      description:
        "A score between 0 to 100 indicating how well the candidate's profile matches the job description",
    },
    technicalQuestions: {
      type: "array",
      description:
        "Technical questions that can be asked in the interview along with their intention",
      items: questionSchema,
    },
    behavioralQuestions: {
      type: "array",
      description:
        "Behavioral questions that can be asked in the interview along with their intention",
      items: questionSchema,
    },
    skillGaps: {
      type: "array",
      description:
        "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
          },
        },
        required: ["skill", "severity"],
        additionalProperties: false,
      },
    },
    preparationPlan: {
      type: "array",
      description:
        "A concrete 7 day, day-wise preparation plan to help the candidate succeed in the interview, while designing the roadmap give 60% focus on closing the skill gaps as much as possible and 40% focus on the overall tech stack, system design, DSA, OOP, Aptitude ",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focus: { type: "string" },
          tasks: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["day", "focus", "tasks"],
        additionalProperties:false
      },
      
    },
  },
  required: [
    "title",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
  additionalProperties: false,
};

export const recruiterReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  hiringRecommendation: z.enum([
    "strong_hire",
    "hire",
    "consider",
    "weak_fit",
    "reject"
  ]),

  executiveSummary: z.string(),

  strengths: z.array(
    z.object({
      area: z.string(),
      explanation: z.string()
    })
  ),

  weaknesses:z.array(
    z.object({
      area: z.string(),
      explanation: z.string()
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum([
        "low",
        "medium",
        "high",
      ]),
    })
  ),

  skillMatchAnalysis: z.object({
    strongMatch: z.array(z.string()),
    partialMatch: z.array(z.string()),
    missing: z.array(z.string()),
  }),

  experienceEvaluation: z.string(),

  

  
})

export const recruiterReportGroqSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "matchScore",
    "hiringRecommendation",
    "executiveSummary",
    "strengths",
    "weaknesses",
    "skillGaps",
    "skillMatchAnalysis",
    "experienceEvaluation",
    
  ],
  properties: {
    matchScore: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },

    hiringRecommendation: {
      type: "string",
      enum: [
        "strong_hire",
        "hire",
        "consider",
        "weak_fit",
        "reject",
      ],
    },

    executiveSummary: {
      type: "string",
    },

    strengths: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "area",
          "explanation",
        ],
        properties: {
          area: {
            type: "string",
          },
          explanation: {
            type: "string",
          },
        },
      },
    },

    weaknesses: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "area",
          "explanation",
        ],
        properties: {
          area: {
            type: "string",
          },
          explanation: {
            type: "string",
          },
        },
      },
    },

    skillGaps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "skill",
          "severity",
        ],
        properties: {
          skill: {
            type: "string",
          },
          severity: {
            type: "string",
            enum: [
              "low",
              "medium",
              "high",
            ],
          },
        },
      },
    },

    skillMatchAnalysis: {
      type: "object",
      additionalProperties: false,
      required: [
        "strongMatch",
        "partialMatch",
        "missing",
      ],
      properties: {
        strongMatch: {
          type: "array",
          items: {
            type: "string",
          },
        },

        partialMatch: {
          type: "array",
          items: {
            type: "string",
          },
        },

        missing: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },

    experienceEvaluation: {
      type: "string",
    },

    
  },
};