import axios from "axios";

const api=axios.create({
    baseURL:"https://ai-resume-planner.vercel.app/api/interview",
    withCredentials:true
    
})

export async function generateInterviewReport({resume,selfDescription,jobDescription}){
    try{
        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("selfDescription", selfDescription);
        formData.append("jobDescription", jobDescription);
        const response = await api.post("/", formData, {
headers:{
            "Content-Type": "multipart/form-data"
}
        })
        console.log("generateInterviewReportData"+response)
        return response.data
    }
     catch (error) {
    console.error("Error during generate interview report:",error.response.status, error);
    throw error;
}
}

export async function getInterviewReportById(interviewId){
    try {
        const response=await api.get(`/report/${interviewId}`)
          console.log("getInterviewReportByIdData"+response)
          return response.data
        } catch (error) {
            console.error("Error during registration:",error.response.status, error);
            throw error;
        }
    }
    
    export async function getAllInterviewReport(){
        try {
            const response=await api.get("/")
            console.log("getInterviewReportByIdData"+response)
            return response.data

    } catch (error) {
         console.error("Error during registration:",error.response.status, error);
    throw error;
    }
}

export async function generateResumePdf(inteviewReportId){
    try {
        const response =await api.get(`/resume/pdf/${inteviewReportId}`, { 
            responseType:"blob"
        })
        return response.data
        
    } catch (error) {
         console.error("Error during generate resume pdf:",error.response.status, error);
    throw error;
    }
    

}