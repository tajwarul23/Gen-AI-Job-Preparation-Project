import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobApi,
  deleteJobApi,
  generateJobDescriptionApi,
  getCandidateJobFeedApi,
  getCompanyJobFeedApi,
  updateJobApi,
} from "../Services/Job.api";

//-----------------QUERIES------------------------------
export const useGetCompanyJobFeed = () => {
  return useQuery({
    queryFn: getCompanyJobFeedApi,
    queryKey: ["companyJobFeed"],
  });
};

export const useGetCandidateJobFeed = () => {
  return useQuery({
    queryFn: getCandidateJobFeedApi,
    queryKey: ["candidateJobFeed"],
  });
};

//-----------------MUTATIONS------------------------------
export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companyJobFeed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["candidateJobFeed"],
      });
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to create job");
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, formData }) => updateJobApi(jobId, formData),

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
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to delete job");
    },
  });
};

export const useGenerateJobDescription = () => {
  return useMutation({
    mutationFn: generateJobDescriptionApi,
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to create job");
    },
  });
};
