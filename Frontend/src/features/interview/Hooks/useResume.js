import { useContext } from "react";
import { ResumeContext } from "../resume.context";
import {
  createResumeAPI,
  deleteResumeByIdAPI,
  getAllResumeAPI,
  getResumeByIdAPI,
} from "../services/resume.api";

export const useResume = () => {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("useResume must be used within an ResumeProvider");
  }

  const {
    loading,
    setLoading,
    resume,
    setResume,
    resumes,
    setResumes,
    error,
    setError,
  } = context;

  const createResume = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createResumeAPI(data);
      setResume(response.resume);
      return response.resume;
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllResume = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllResumeAPI();
      setResumes(response.allResume);
      return response.allResume;
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getResumeById = async (resumeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getResumeByIdAPI(resumeId);
      setResume(response.resumeById);
      return response.resumeById;
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const deleteResumeById = async (resumeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteResumeByIdAPI(resumeId);
      setResumes((prev) => prev.filter((r) => r._id !== resumeId));
      return response;
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return {
    createResume,
    getAllResume,
    getResumeById,
    deleteResumeById,
    resume,
    resumes,
    error,
    loading,
  };
};
