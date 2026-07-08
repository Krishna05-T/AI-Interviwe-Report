import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePDF } from "../service/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
    const { interviewId } = useParams();
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const { loading, report, reports, setLoading, setReport, setReports } = context


    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let respones = null
        try {
            respones = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(respones.data)
            return respones.data
        } catch (error) {
            console.log(`Error occure form hooks generateReport  ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const generateReportById = async (interviewId) => {
        setLoading(true)
        let respones = null
        try {
            respones = await getInterviewReportById(interviewId);
            setReport(respones.data)
            return respones.data
        } catch (error) {
            console.log(`Error occure form Hooks generateReportById ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const getAllReports = async () => {
        setLoading(true)
        let respones = null
        try {
            respones = await getAllInterviewReports()
            setReports(respones.data)
            return respones.data
        } catch (error) {
            console.log(`Error occure form getAllreports ${error.message}`)
        }
        finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewId) => {
        setLoading(true)
        let respones = null
        try{
            respones = await generateResumePDF({ interviewId })
            const url = window.URL.createObjectURL(new Blob([respones], { type: "application/pdf"}))
            const link = document.createElement("a") 
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch(error) {
            console.log(`Error occure form getResumePdf ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return { loading, report, reports, generateReport, generateReportById, getAllReports, getResumePdf }
}