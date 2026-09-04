import axios from "axios";

const api = axios.create({
  baseURL: "https://hireflow-r73i.onrender.com/api/application",
  withCredentials: true,
});

export const getCandidateApplicationsApi = async ({
  status,
  job,
  sort,
  page,
  limit,
} = {}) => {
  const params = {};
  if (status) params.status = status;
  if (job) params.job = job;
  if (sort) params.sort = sort;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  const response = await api.get("/", { params });
  return response.data;
};
