import { Router } from "express"
import { JWTverify } from "../middleware/auth.middleware.js";
import { reportController, getAllInterviewReportController, generateInterviewReportByIDController } from "../controller/report.controller.js";
import { upload } from "../middleware/file.midddleware.js";

const reportRouter = Router()


/**
 * @route POST /api/v1/report/ai-service
 * @description genrate new interview report on the basic of user self description resume pdf and job description
 * @access private
*/
reportRouter.post("/ai-service", JWTverify, upload.single("resume"), reportController)

/**
 * @route GET /api/v1/report/:interviewId
 * @description get interview report by ID
 * @access private
 */

reportRouter.get("/id/:interviewId", JWTverify, generateInterviewReportByIDController)

/**
 * @route GET /api/v1/report/ai-service
 * @description  get all interview report form the logged in user
 * @access private
 */
reportRouter.get("/ai-service", JWTverify, getAllInterviewReportController)

export default reportRouter;

