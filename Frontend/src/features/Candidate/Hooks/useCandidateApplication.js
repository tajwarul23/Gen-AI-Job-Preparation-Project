import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCandidateApplicationsApi } from "../Services/application.api.js";
import { AuthContext } from "../../Auth/auth.context";

export const useGetCandidateApplications = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["candidateApplications", user?.id],
    queryFn: () => getCandidateApplicationsApi({ limit: 100, sort: "newest" }),
    enabled: !!user?.id,
    staleTime: 60 * 1000,
  });
};
