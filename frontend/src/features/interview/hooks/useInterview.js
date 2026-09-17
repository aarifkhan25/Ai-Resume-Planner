import { useContext ,useEffect} from "react";

import {InterviewContext} from "../interview.context.jsx"
import{generateInterviewReport,getInterviewReportById,getAllInterviewReport,generateResumePdf} from "../services/interview.api.js"
import { useParams } from "react-router";
export function useInterview(){
    const context=useContext(InterviewContext);
    const {loading, setLoading,report,setReport,reports,setReports}=context
const {interviewId}=useParams()
async function handleGenerateInterviewReport({resume,selfDescription,jobDescription}) {
    let response
    try {
        setLoading(true)
        response = await generateInterviewReport({resume,selfDescription,jobDescription})
        setReport(response.interviewReport)

    } catch (error) {
            console.error("Error to Generate report:", error);
        }finally{
            setLoading(false);
        }
        return response?.interviewReport
}
async function handleGetInterviewReportById(interviewId) {
    let response
    try {
        setLoading(true)
        response = await getInterviewReportById(interviewId)
        setReport(response.interviewReport)

    } catch (error) {
            console.error("Error to find  InterviewId:", error);
        }finally{
            setLoading(false);
        }
        return response?.interviewReport
}

async function handleGetAllInterviewReport() {
    let response
    try {
        setLoading(true)
        response = await getAllInterviewReport()
        setReports(response.interviewReports)

    } catch (error) {
            console.error("Error to find  InterviewId:", error);
        }finally{
            setLoading(false);
        }
        return response?.interviewReports
}

async function handleGenerateResumePdf(interviewReportId) {
    let response
    setLoading(true)
    try{
        response=await generateResumePdf(interviewReportId)
        const url=window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
        const link=document.createElement("a")
        link.href=url
        link.setAttribute("download",`resume_${interviewReportId}.pdf`)
        document.body.appendChild(link)
        link.click()
        

    }catch (error) {
            console.error("Error to find  InterviewId:", error);
        }finally{
            setLoading(false);
        }
      
}
useEffect(()=>{
if(interviewId){
    handleGetInterviewReportById(interviewId)
}else{
    handleGetAllInterviewReport()
}
},[interviewId])
return{loading,report,reports,handleGenerateInterviewReport,handleGetAllInterviewReport,handleGetInterviewReportById,handleGenerateResumePdf}
}