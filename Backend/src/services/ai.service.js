import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  interviewReportGeminiSchema,
  interviewReportSchema,
} from "../Schemas/interviewReportSchema.js";
import {
  resumeGeminiSchema,
  ResumeReportSchema,
} from "../Schemas/resumeReportSchema.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ─── Generate interview report Function ────────────────────────────────────────────────────────────

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

//------ Generate resume function--------------------------
export const generateResume = async (resumeData) => {
  const {
    fullName,
    email,
    phone,
    location,
    portfolioUrl,
    linkedinUrl,
    githubProfileLink,
    summary,
    experiences,
    education,
    skills,
    certifications,
    projects,
  } = resumeData;
  const prompt = `You are a professional resume writer and ATS optimization expert.
  using the structured data below do the following:
  1. Write a compelling professional summary (3-4 sentences) if not provided or improve the existing one.
2. Rewrite each job achievement as a strong action-verb bullet point (quantify where possible).
3. Rewrite each project description to be impactful and technical.
4. Return ONLY a valid JSON object. No explanation, no markdown, no code fences.
IMPORTANT RULES:
- Always include https:// in ALL URLs (linkedin, github, portfolio, project links)
- If a URL is not provided, return an empty string "" — never return "N/A"
- Never invent URLs — copy them exactly from the input
5. Give a properly calculated ATS Score from 0 to 100
6. Give a standard and professional title for the resume
---RESUME DATA----

PERSONAL INFO
Name : ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${location}
LinkedIn:${linkedinUrl},
Github: ${githubProfileLink},
Portfolio: ${portfolioUrl},
Personal Summary: ${summary || "if not provided, generate one."}

EXPERIENCES : ${
    experiences.length
      ? experiences.map(
          (exp, i) =>
            `${i + 1}. Company : ${exp.company} Job Duration: ${exp.duration} Job Location: ${exp.expLocation} Achievements: ${exp.achievements}`,
        )
      : "No experience Provided"
  }

  EDUCATIONS: ${education.length ? education.map((edu, i) => `${i + 1}. Degree: ${edu.degree} Institution: ${edu.institution}${edu.result ? ` Result: ${edu.result}` : ""}`).join(" | ") : "No education provided"}

  SKILLS: ${skills.length ? skills.map((s) => `Skill Name:${s.name} Description:${s.description}`) : "No skills provided"}

  CERTIFICATIONS: ${certifications.length ? certifications.map((c) => `Name: ${c.name} Issuer: ${c.issuer} IssueDate: ${c.issueDate} credentialURL :${c.credentialUrl} `) : "No certifications provided"}
  
  PROJECTS: ${projects.length ? projects.map((p) => `Project Name: ${p.name} LiveLink: ${p.liveLink} Github Repo: ${p.githubLink} project Description: ${p.description}`) : "No project provided"}
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeGeminiSchema,
      },
    });
    const parsed = JSON.parse(response.text);
    const validated = ResumeReportSchema.parse(parsed);
    // console.log(validated);
    return validated;
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Response validation failed:", error);
      throw new Error("AI response did not match the expected schema");
    }
    console.error("Error generating interview report:", error);
    throw error;
  }
}
