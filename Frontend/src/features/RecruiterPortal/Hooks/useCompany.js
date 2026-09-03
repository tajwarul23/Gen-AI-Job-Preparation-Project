import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCompanyApi,
  generateInvitationLinkApi,
  getAboutCompanyApi,
  getCompanyApi,
  inviteByEmailApi,
  joinCompanyApi,
  leaveCompanyApi,
  removeEmployeeApi,
  updateCompanyInfoApi,
  updateCompanyLogoApi,
} from "../Services/company.api";

import { useContext } from "react";
import { AuthContext } from "../../Auth/auth.context";


/* 
   GET COMPANY
 */

export const useGetCompany = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["company", user?.id],
    queryFn: getCompanyApi,
    staleTime: 1 * 60 * 1000,
    enabled: !!user?.id,
  });
};
/* 
   GET ABOUT COMPANY
 */

   export const useGetAboutCompany = (companyId, enabled = true) =>{
    return useQuery({
      queryKey:["aboutCompany", companyId],
      queryFn: ()=>getAboutCompanyApi(companyId),
      enabled: !!companyId && enabled
    })
   }

/* 
   CACHE HELPER
 */

const updateCompanyCache = (
  queryClient,
  userId,
  company
) => {
  queryClient.setQueryData(
    ["company", userId],
    company
  );

  queryClient.invalidateQueries({
    queryKey: ["company", userId],
  });
};


/* 
   CREATE COMPANY
 */

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: createCompanyApi,

    onSuccess: (data) => {
      const updatedUser = data.updatedUser || user;

      if (data.updatedUser) {
        setUser(data.updatedUser);
      }

      updateCompanyCache(
        queryClient,
        updatedUser?.id,
        data.data
      );
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to Create Company"
      );
    },
  });
};


/* 
   GENERATE INVITE LINK
 */

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


/*
   INVITE BY EMAIL
 */

export const useInviteByEmail = () => {
  return useMutation({
    mutationFn: inviteByEmailApi,

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to send invite email"
      );
    },
  });
};


/*
   JOIN COMPANY
 */

export const useJoinCompany = () => {
  const queryClient = useQueryClient();
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: joinCompanyApi,

    onSuccess: (data) => {
      const updatedUser = data.data;

      setUser(updatedUser);

      queryClient.invalidateQueries({
        queryKey: ["company", updatedUser?.id],
      });
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to join company"
      );
    },
  });
};


/*
   LEAVE COMPANY
 */

export const useLeaveCompany = () => {
  const queryClient = useQueryClient();
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: leaveCompanyApi,

    onSuccess: (data) => {
      const updatedUser = data.data;

      setUser(updatedUser);

      queryClient.invalidateQueries({
        queryKey: ["company", updatedUser?.id],
      });
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to leave company"
      );
    },
  });
};


/*
   REMOVE EMPLOYEE
 */

export const useRemoveEmployee = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: removeEmployeeApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company", user?.id],
      });
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to remove employee"
      );
    },
  });
};


/*
   UPDATE COMPANY INFO
 */

export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: updateCompanyInfoApi,

    onSuccess: (data) => {
      updateCompanyCache(
        queryClient,
        user?.id,
        data.data
      );
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to Update company info"
      );
    },
  });
};


/* 
   UPDATE COMPANY LOGO
 */

export const useUpdateCompanyLogo = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: updateCompanyLogoApi,

    onSuccess: (data) => {
      updateCompanyCache(
        queryClient,
        user?.id,
        data.data
      );
    },

    onError: (error) => {
      console.error(
        error?.response?.data?.message ||
          "Failed to Update company logo"
      );
    },
  });
};