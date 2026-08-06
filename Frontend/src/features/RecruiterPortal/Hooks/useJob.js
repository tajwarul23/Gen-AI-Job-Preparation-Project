import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobApi,
  deleteJobApi,
  generateJobDescriptionApi,
  getCandidateJobFeedApi,
  getCompanyJobFeedApi,
  updateJobApi,
} from "../Services/Job.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
//-----------------QUERIES------------------------------
export const useGetCompanyJobFeed = () => {
  return useQuery({
    queryFn: getCompanyJobFeedApi,
    queryKey: ["companyJobFeed"],
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCandidateJobFeed = () => {
  return useQuery({
    queryFn: getCandidateJobFeedApi,
    queryKey: ["candidateJobFeed"],
    staleTime: 5 * 60 * 1000,
  });
};

//-----------------MUTATIONS------------------------------
export const useCreateJob = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobApi,
    onSuccess: (data) => {
      toast.success("Job Posted Successfully")
      console.log(data);
      
      queryClient.invalidateQueries({
        queryKey: ["companyJobFeed"],
        
        
      });
      queryClient.invalidateQueries({
        queryKey: ["candidateJobFeed"],
      });
      
      navigate("/recruiter/jobFeed");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create job")
      console.error(error?.response?.data?.message || "Failed to create job");
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }) => updateJobApi(jobId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companyJobFeed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["candidateJobFeed"],
      });
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to Update job");
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companyJobFeed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["candidateJobFeed"],
      });
      toast.success("Job Deleted Successfully")
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to delete job");
      toast.error("Job Deletion Failed. Please Try later")
    },
  });
};

export const useGenerateJobDescription = () => {
  return useMutation({
    mutationFn: generateJobDescriptionApi,

    onError: (error) => {
      console.error(
        error?.response?.data?.message || "Failed to generate job description"
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to generate job description. Please try again."
      );
    },
  });
};
