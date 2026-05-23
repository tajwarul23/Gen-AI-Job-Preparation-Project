import { useContext } from "react";
import {
  getAllInterviewReports,
  getInterviewReportById,
  generateInterviewReport,
} from "../services/interview.api.js";
import { InterviewContext } from "../interview.context";



export const useInterview = () => {
  
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;
    try {
       response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      // console.log(report);
      
      return response.interviewReport;
    } catch (error) {
      console.log("Error in generateReport", error.message);
    } finally {
      setLoading(false);
    }
    return response.interviewReport
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
       response = await getInterviewReportById(interviewId);
      
      
      setReport(response.interviewReport);
    } catch (error) {
      console.log("Error in getReportById", error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport
  };

 const getAllReport = async () => {
    setLoading(true);
    try {
        const response = await getAllInterviewReports();
        setReports(response.allReport);
        return response.allReport;
    } catch (error) {
        console.log("Error in getAllReport", error.message);
    } finally {
        setLoading(false);
    }
    
  }


  return { generateReport, getReportById, getAllReport, loading, report, reports };
};
