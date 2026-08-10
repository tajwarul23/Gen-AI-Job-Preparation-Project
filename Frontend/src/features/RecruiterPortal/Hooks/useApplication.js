import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllApplicationForCompanyApi, updateApplicationStatusApi } from "../Services/Application.api";
import { useContext } from "react";
import { AuthContext } from "../../Auth/auth.context";
import toast from "react-hot-toast";


export const useGetAllApplicationForCompany = (filters = {}) => {
  const {user} = useContext(AuthContext);
  const company = user?.company
  return useQuery({
    queryKey: ["companyApplications", company, filters],

    queryFn: () => getAllApplicationForCompanyApi(filters),

    enabled: !!filters.job && !!company,

    staleTime: 60 * 1000,

    refetchInterval: (query) => {
      const applications = query.state.data?.data?.applications ?? [];

      const isGenerating = applications.some(
        (application) => application.recruiterReportStatus === "generating",
      );

      return isGenerating ? 3000 : false;
    },
  });
};

export const useUpdateApplicationStatus = () =>{
  const queryClient = useQueryClient();
  const {user} = useContext(AuthContext);
  const company = user?.company;

  return useMutation({
    mutationFn: ({applicationId, status}) => updateApplicationStatusApi(applicationId, status),

    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: ["companyApplications",company]
      })

      toast.success("Application Status updated")
    },

    onError: (error)=>{
      toast.error(error?.response?.data?.message || "Failed to update application status")
    }
  })
}