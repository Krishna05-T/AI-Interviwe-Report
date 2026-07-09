import Groq from "groq-sdk"
import { z } from "zod";
import puppeteer from "puppeteer"

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

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
Each object MUST contain:
- question
- intention
- answer

3. behavioralQuestion

Each object MUST contain:
- question
- intention
- answer

4. skillGap

Each object MUST contain:
- skill
- severity

5. preparationPlan

Each object MUST contain:
- day
- focus
- tasks

Do not rename any fields.
Do not omit any fields.

The JSON object must include these exact top-level fields:
- title
- matchScore
- technicalQuestion
- behavioralQuestion
- skillGap
- preparationPlan

Do not stop until all fields are generated.
technicalQuestion must contain exactly 5 items.
behavioralQuestion must contain exactly 5 items.
skillGap must contain exactly 5 items.
preparationPlan must contain exactly 14 items.
`;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical recruiter. Return only valid JSON using the provided schema.",
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
          schema: z.toJSONSchema(interviewReportSchema),
        },
      },
      max_completion_tokens: 6000,
    });

    const rawReport = JSON.parse(response.choices[0].message.content || "{}");
    const report = interviewReportSchema.parse(rawReport);

    return report;
  } catch (error) {
    console.error("Error occurred in ai service:", error.message);
    throw error;
  }
}


async function generatePdfFormHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle2" })

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  })

  await browser.close()
  return pdfBuffer
}


// here we generate html and with the help of puppeteer we generate pdf form html
async function generateResumePDF({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
  })

const prompt = `
Generate a professional, modern, and ATS-friendly resume for the following candidate.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Instructions:

- Mention the name in resume form the give resume
- Return ONLY a valid JSON object with a single field named "html".
- The "html" field must contain the complete HTML document.
- Tailor the resume specifically to the provided Job Description by emphasizing the candidate's most relevant skills, projects, experience, and achievements.
- The content should sound natural and human-written, not AI-generated.
- The resume should be visually attractive, clean, and professional while remaining ATS-friendly.
- The entire resume should fit within 1–2 A4 pages when converted to PDF.
- Use space efficiently. Avoid excessive whitespace, large gaps, unnecessary padding, or repeated blank lines.
- Do not output "\\n", "/n", escaped newline characters, or unnecessary <br> tags. Use proper HTML elements only.
- Keep the header compact and place the candidate's name and contact information in the center.
- Organize the resume into clear sections such as Summary, Technical Skills, Experience, Projects, Education, Certifications, and Achievements.
- Keep summaries concise, experience descriptions impactful, and project descriptions short but meaningful.
- Avoid repeating information across sections.
- Use professional colors and a modern layout without making the resume overly decorative.
- Ensure the final resume is compact, well-balanced, easy to read, recruiter-friendly, and suitable for direct PDF generation using Puppeteer.
`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "resume",
        strict: true,
        schema: z.toJSONSchema(resumePdfSchema),
      },
    },
    max_completion_tokens: 6000,
  });
  const rawResume = JSON.parse(response.choices[0].message.content || "{}")
  const resumeData = resumePdfSchema.parse(rawResume)

  const pdfBuffer = await generatePdfFormHtml(resumeData.html)

  return pdfBuffer;
}

export { generateInterviewReport, generateResumePDF };
