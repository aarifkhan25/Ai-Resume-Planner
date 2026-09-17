const { PDFParse } = require("pdf-parse");
const { generateInterviewReport ,generateResumePdf} = require('../services/ai.service.js');
const interviewReportModel = require("../models/interviewReport.model.js");

async function generateInterviewReportController(req, res) {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'Resume PDF is required.' });
        }     

        const parser = new PDFParse({ data: req.file.buffer });
        const resumeContent = await parser.getText();
        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        return res.status(201).json({
            message: "Interview Report Generated Successfully",
            interviewReport,
        });
    } catch (error) {
        console.error('Error generating interview report:', error);
        return res.status(500).json({
            message: 'Failed to generate interview report',
            error: error.message,
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    try{
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findById({_id:interviewId,user:req.user.id});
        if(!interviewReport){
            return res.status(404).json({ message: 'Interview report not found' });
        }
        return res.status(200).json({message:"Interview report fetched successfully", interviewReport });
    }catch(error){
        console.error('Error fetching interview report:', error);
        return res.status(500).json({
            message: 'Failed to fetch interview report',
            error: error.message,
        });
    }

}
async function getAllInterviewReportController(req, res) {
    try{
 const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
        if(!interviewReports || interviewReports.length === 0){
            return res.status(404).json({ message: "No interview reports found" });
        }
 return res.status(200).json({ message: "All interview reports fetched successfully", interviewReports });
    }
    catch(error){
        console.error('Error fetching all interview reports:', error);
        return res.status(500).json({
            message: 'Failed to fetch all interview reports',
            error: error.message,
        });
    }
}

async function generateResumePdfController(req, res) {
    const {interviewReportId} = req.params;
    try{
        const interviewReport=await interviewReportModel.findById(interviewReportId);
        if(!interviewReport){
            return res.status(404).json({ message: 'Interview report not found' });
        }
        const {resume,selfDescription,jobDescription}=interviewReport;
        const pdfBuffer = await generateResumePdf({resume,selfDescription,jobDescription});
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="resume_${interviewReportId}.pdf"`,
        })
res.send(pdfBuffer)
    }catch(error){
        console.error('Error generating resume PDF:', error);
        return res.status(500).json({
            message: 'Failed to generate resume PDF',
            error: error.message,
        });
    }
}
module.exports = { generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportController,generateResumePdfController };