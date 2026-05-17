import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ─── Zod Schema (for validation after response) ───────────────────────────────

const interviewReportSchema = z.object({
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

// ─── Gemini Native Schema (plain strings instead of SchemaType enum) ──────────

const questionSchema = {
  type: "object",
  properties: {
    question: { type: "string" },
    intention: { type: "string" },
    answer: { type: "string" },
  },
  required: ["question", "intention", "answer"],
};

const interviewReportGeminiSchema = {
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
      },
    },
    preparationPlan: {
      type: "array",
      description:
        "A concrete 30 day, day-wise preparation plan to help the candidate succeed in the interview, while designing the roadmap give 60% focus on closing the skill gaps as much as possible and 40% focus on the overall tech stack, system design, DSA, OOP, Aptitude ",
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
      },
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

// ─── Main Function ────────────────────────────────────────────────────────────

export const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `Generate a detailed interview report for a candidate with the following details:
  
Resume: ${resume}

Self Description: ${selfDescription}

Job Description: ${jobDescription}

Based on the above information, generate:
1. A match score (0-100) showing how well the candidate fits the role
2. At least 5 technical questions relevant to the job description
3. At least 3 behavioral questions
4. Any skill gaps in the candidate's profile, sort them from high to low
5. A concrete 30 day, day-wise preparation plan to help the candidate succeed in the interview, while designing the roadmap give 60% focus on closing the skill gaps as much as possible and 40% focus on the overall tech stack, system design, DSA, OOP, Aptitude `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: interviewReportGeminiSchema,
      },
    });

    const parsed = JSON.parse(response.text);
    const validated = interviewReportSchema.parse(parsed);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Response validation failed:", error.errors);
      throw new Error("AI response did not match the expected schema");
    }
    console.error("Error generating interview report:", error);
    throw error;
  }
};
