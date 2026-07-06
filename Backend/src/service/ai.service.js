import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate matches the job requirements."
    ),

  technicalQuestion: z
    .array(
      z.object({
        question: z.string().describe("Technical interview question."),
        intention: z
          .string()
          .describe("Why the interviewer asks this question."),
        answer: z
          .string()
          .describe("Ideal answer with key points to cover."),
      })
    )
    .describe("List of technical interview questions."),

  behavioralQuestion: z
    .array(
      z.object({
        question: z.string().describe("Behavioral interview question."),
        intention: z
          .string()
          .describe("Purpose of asking this question."),
        answer: z
          .string()
          .describe("Suggested approach for answering."),
      })
    )
    .describe("List of behavioral interview questions."),

  skillGap: z
    .array(
      z.object({
        skill: z.string().describe("Missing skill."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("Importance of the missing skill."),
      })
    )
    .describe("Missing skills and their severity."),

  preparationPlan: z
    .array(
      z.object({
        day: z.string().describe("Day number."),
        focus: z.string().describe("Focus area for the day."),
        tasks: z.array(z.string()).describe("Tasks to complete."),
      })
    )
    .describe("Day-wise interview preparation plan."),
    title: z.string().describe("Title of the job for which the interview report is genrated"),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  if (!resume || !selfDescription || !jobDescription) {
    throw new Error("resume, selfDescription, and jobDescription are required");
  }

  const prompt = `
You are an expert technical recruiter.

Analyze the following candidate information.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

IMPORTANT INSTRUCTIONS:

Return ONLY valid JSON.

Do not return Markdown.

Do not wrap the response inside another object like "interviewReport".

The response MUST exactly follow the provided JSON schema.

Generate:

1. matchScore (0-100)

2. technicalQuestion
Generate 5 objects.
Each object MUST contain:
- question
- intention
- answer

3. behavioralQuestion
Generate 5 objects.
Each object MUST contain:
- question
- intention
- answer

4. skillGap
Generate 5 objects.
Each object MUST contain:
- skill
- severity

5. preparationPlan
Generate a 14-day plan.
Each object MUST contain:
- day
- focus
- tasks

Do not rename any fields.
Do not omit any fields.
`;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    const report = JSON.parse(response.text);
    // console.log(report);
    return report;
  } catch (error) {
    console.error("Error occurred in ai service:", error.message);
    throw error;
  }
} 

export default generateInterviewReport;
