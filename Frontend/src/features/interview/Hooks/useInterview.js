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

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    error,
    setError,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (response?.success) {
        setReport(response.interviewReport);
        return response.interviewReport;
      }
      if(!response?.success){
        setError(error?.response?.data?.message || "AI generation Failed Please Try again later..!");
      }
    } catch (error) {
      console.log("Error in generateReport", error.message);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInterviewReportById(interviewId);
      if (response?.success && response?.interviewReport) {
        setReport(response.interviewReport);
        return response.interviewReport;
      }
      else{
        setReport(null);
        setError("Report not found..!")
      }

      
    } catch (error) {
      setReport(null);
      console.log("Error in getReportById", error);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllInterviewReports();
      if (response?.success) {
        setReports(response.allReport || []);
        return response.allReport;
      }
      else{
        setReports([]);
        setError("Failed to load Reports")
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      console.log("Error in getAllReport", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateReport,
    getReportById,
    getAllReport,
    loading,
    report,
    reports,
    error,
    setReport, setError
  };
};
