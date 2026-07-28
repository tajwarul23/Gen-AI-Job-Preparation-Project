import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  interviewReportGroqSchema,
  interviewReportSchema,
} from "../Schemas/interviewReportSchema.js";
import {
  resumeGroqSchema,
  ResumeReportSchema,
} from "../Schemas/resumeReportSchema.js";
import ApiError from "../Utils/ApiError.js";

const ai = new Groq({
  apiKey: process.env.GROK_API_KEY,
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
5. A concrete 7 day, day-wise preparation plan to help the candidate succeed in the interview, while designing the roadmap give 60% focus on closing the skill gaps as much as possible and 40% focus on the overall tech stack, system design, DSA, OOP, Aptitude `;

  try {
    const response = await ai.chat.completions.create({
      model: process.env.GROK_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an interview coach. Always respond with valid JSON only. Never use markdown or code fences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "interview_report",
          strict: true,
          schema: interviewReportGroqSchema,
        },
      },
      temperature: 0.7,
      max_tokens: 2000,
    });
    // console.log("response => ",response.choices[0].message.content);

    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      throw new ApiError(501, "AI validation failed");
    }
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
  const prompt = `
You are an expert Resume Writer, ATS Optimization Specialist, and Technical Recruiter.

Your task is to analyze the candidate resume data below and generate an optimized, ATS-friendly resume.

Follow these rules strictly:

## Resume Optimization Tasks

1. Professional Summary:
- Generate a strong professional summary of 3-4 sentences.
- Highlight candidate experience, technical skills, achievements, and career direction.
- If an existing summary exists, improve it while preserving the candidate's actual background.
- Do not add fake experience.

2. Skills:
- Improve each skill description.
- Keep descriptions concise, professional, and impact-focused.
- Do not add skills that are not present in the input.

3. Work Experience:
- Rewrite every achievement using strong action verbs.
- Convert weak statements into measurable achievements.
- Add metrics only if they can be reasonably inferred from the provided information.
- Never fabricate numbers, company details, or responsibilities.

Example:
Before:
"Worked on backend APIs"

After:
"Developed and optimized backend APIs to improve application performance and scalability"

4. Education:
- Rewrite degree names into their full, professional format by expanding abbreviations and including the major/specialization whenever it is available.
- Keep institution names exactly as provided.
- Do not invent or infer majors, specializations, grades, CGPA, GPA, results, graduation dates, or honors that are not explicitly mentioned.
- If only an abbreviated degree and major are provided, expand them into the official degree name.

Examples:
- Input: BSc CSE → Output: Bachelor of Science (BSc) in Computer Science and Engineering
- Input: BBA Marketing → Output: Bachelor of Business Administration (BBA) in Marketing
- Input: MSc EEE → Output: Master of Science (MSc) in Electrical and Electronic Engineering
- Input: Diploma CSE → Output: Diploma in Computer Science and Engineering
- Input: BSc → Output: Bachelor of Science (BSc)

5. Projects:
- Rewrite project descriptions to emphasize:
  - Technical implementation
  - Architecture
  - Technologies used
  - Impact/features
- Make descriptions suitable for software engineering roles.
- Do not invent technologies.

6. ATS Score:
Calculate an ATS score between 0-100 based on:

- Relevant skills matching job market expectations
- Keyword optimization
- Experience quality
- Achievement strength
- Project quality
- Resume completeness
- Professional formatting

Return a realistic score.

7. Resume Title:
Generate a professional resume title based on the candidate profile.

Examples:
"Full Stack Software Engineer"
"Frontend React Developer"
"Backend Node.js Engineer"

Do not use generic titles like "Resume" or "CV".

---

## URL Rules

- Always include https:// for URLs.
- If a URL exists in the input, preserve it exactly.
- Never create or modify URLs.
- If URL is missing, return an empty string "".
- Never return "N/A", "Not Available", or placeholders.

---

## Output Rules

- Return ONLY valid JSON.
- No explanation.
- No markdown.
- No code blocks.
- Follow the provided JSON schema exactly.
- Every field must be included.
- Use empty strings "" for unavailable text fields.
- Use empty arrays [] when no data exists.

---

## Candidate Resume Data

### PERSONAL INFORMATION

Name:
${fullName}

Email:
${email}

Phone:
${phone}

Location:
${location}

LinkedIn:
${linkedinUrl}

GitHub:
${githubProfileLink}

Portfolio:
${portfolioUrl}

Current Summary:
${summary || "No summary provided"}

---

### EXPERIENCE

${
  experiences.length
    ? experiences
        .map(
          (exp, i) => `
${i + 1}.
Company: ${exp.company}
Job Title: ${exp.jobTitle}
Duration: ${exp.duration}
Location: ${exp.expLocation}

Achievements:
${exp.achievements}
`,
        )
        .join("\n")
    : "No experience provided"
}

---

### EDUCATION

${
  education.length
    ? education
        .map(
          (edu, i) => `
${i + 1}.
Degree: ${edu.degree}
Institution: ${edu.institution}
Result: ${edu.result || ""}
`,
        )
        .join("\n")
    : "No education provided"
}

---

### SKILLS

${
  skills.length
    ? skills
        .map(
          (skill) => `
Skill:
${skill.name}

Current Description:
${skill.description || ""}
`,
        )
        .join("\n")
    : "No skills provided"
}

---

### CERTIFICATIONS

${
  certifications.length
    ? certifications
        .map(
          (cert) => `
Name:
${cert.name}

Issuer:
${cert.issuer}

Issue Date:
${cert.issueDate}

Credential URL:
${cert.credentialUrl || ""}
`,
        )
        .join("\n")
    : "No certifications provided"
}

---

### PROJECTS

${
  projects.length
    ? projects
        .map(
          (project, i) => `
${i + 1}.

Project Name:
${project.name}

Live Link:
${project.liveLink || ""}

Github:
${project.githubLink || ""}

Description:
${project.description}
`,
        )
        .join("\n")
    : "No projects provided"
}
`;
  try {
    const response = await ai.chat.completions.create({
      model: process.env.GROK_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an interview coach. Always respond with valid JSON only. Never use markdown or code fences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "resume",
          schema: resumeGroqSchema,
          strict: true,
        },
      },
      temperature: 0.7,
      max_tokens: 2500,
    });

    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      throw new ApiError(501, "AI validation failed");
    }
    const validated = ResumeReportSchema.parse(parsed);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Response validation failed:", error);
      throw new Error("AI response did not match the expected schema");
    }
    console.error("Error generating interview report:", error);
    throw error;
  }
};
