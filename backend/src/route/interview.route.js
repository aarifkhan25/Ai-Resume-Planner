const express = require('express');
const interviewRouter = express.Router();
const {authMiddleware}=require("../middleware/auth.middleware.js")
const {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportController,generateResumePdfController} =require("../controllers/interview.controllers.js")
const upload=require("../middleware/file.middleware.js")


interviewRouter.post("/", authMiddleware,upload.single("resume"), generateInterviewReportController)
interviewRouter.get("/report/:interviewId", authMiddleware,getInterviewReportByIdController)
interviewRouter.get("/", authMiddleware, getAllInterviewReportController)
interviewRouter.get("/resume/pdf/:interviewReportId", authMiddleware, generateResumePdfController)
module.exports = interviewRouter
