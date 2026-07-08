import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
})

/**
 * @description Service to genrate interview report based on user   sefl description, resume, job description
 */

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) => {
    // we use formData because if we want to send file from frontend to the backend it is posible by formData
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const respones = await api.post("/report/ai-service", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return respones.data;
}

/**
 * @description Service to genrate interview report by interviewId
 */

export const getInterviewReportById = async (interviewId) => {
    const respones = await api.get(`/report/id/${interviewId}`)

    return respones.data
}

/**
 * @description Service to genrate all interview report of user
 */

export  const getAllInterviewReports = async () => {
    const respones = await api.get("/report/ai-service")
    return respones.data
}