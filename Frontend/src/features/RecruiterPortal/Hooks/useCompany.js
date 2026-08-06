import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCompanyApi,
  generateInvitationLinkApi,
  getCompanyApi,
  joinCompanyApi,
  updateCompanyInfoApi,
  updateCompanyLogoApi,
} from "../Services/company.api";
import { useContext } from "react";
import { AuthContext } from "../../Auth/auth.context";

export const useGetCompany = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: getCompanyApi,
    staleTime: 5 * 60 * 1000,
  });
};

const updateCompanyCache = (queryClient, company) => {
  // Instant UI update
  queryClient.setQueryData(["company"], company);

  // Background refetch
  queryClient.invalidateQueries({
    queryKey: ["company"],
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: createCompanyApi,

    onSuccess: (data) => {
      updateCompanyCache(queryClient, data.data);

      if (data.updatedUser) {
        setUser(data.updatedUser);
      }

      console.log("Company Created", data);
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message || "Failed to Create Company"
      );
    },
  });
};

export const useGenerateInviteLink = () => {
  return useMutation({
    mutationFn: generateInvitationLinkApi,

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to generate invitation link"
      );
    },
  });
};

export const useJoinCompany = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: joinCompanyApi,

    onSuccess: (data) => {
      setUser(data.updatedUser);
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message || "Failed to join company"
      );
    },
  });
};

export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyInfoApi,

    onSuccess: (data) => {
      updateCompanyCache(queryClient, data.data);
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to Update company info"
      );
    },
  });
};

export const useUpdateCompanyLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyLogoApi,

    onSuccess: (data) => {
      updateCompanyCache(queryClient, data.data);
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to Update company logo"
      );
    },
  });
};