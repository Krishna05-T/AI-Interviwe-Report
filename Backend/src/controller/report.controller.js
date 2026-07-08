import { asyncHandler } from "../utils/asyncHandler.js"
import { PDFParse } from "pdf-parse"
import {generateInterviewReport, generateResumePDF} from "../service/ai.service.js";
import { Report } from "../model/Report.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const reportController = asyncHandler(async (req, res) => {

    const resumeContent = await new PDFParse({ data: req.file.buffer }).getText()

    const { selfDescription, jobDescription } = req.body;


    try {

        // console.log({
        //     hasFile: !!req.file,
        //     selfDescription,
        //     jobDescription,
        //     resumeTextLength: resumeContent?.text?.length
        // })
        
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await Report.create({
            user: req.user._id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })


        return res
            .status(200)
            .json(
                new ApiResponse(200, "Interview report fetch successfull ", interviewReport)
            )

    } catch (error) {
        throw new ApiError(400, "Error in ai service "+ error.message)
    }


})

const generateInterviewReportByIDController = asyncHandler(async (req, res) => {
    const { interviewId } = req.params;

    const interviewReport = await Report.findOne({_id: interviewId, user : req.user._id})

    if(!interviewReport) {
        throw new ApiError(400, `Interview report is not found`)
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Interview report fetch successfully", interviewReport)
    )
})

const getAllInterviewReportController = asyncHandler(async(req, res) => {
    const interviewReport = await Report.find({user : req.user._id}).sort({ createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Interview reports fetched successfully ",interviewReport)
    )
})

const generateResumePDFController = asyncHandler(async (req, res) => {
    const { interviewId } = req.params;

    const interviewReport = await Report.findById(interviewId)

    if(!interviewReport) {
        throw new ApiError(400, "Interview report id not found ")
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePDF({resume, jobDescription, selfDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${interviewId}.pdf`
    })

    return res
    .status(200)
    .send(pdfBuffer)
}) 

export { reportController, generateInterviewReportByIDController, getAllInterviewReportController, generateResumePDFController }
