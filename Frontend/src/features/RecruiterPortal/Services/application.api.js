import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/application",
  withCredentials: true,
});

export const getAllApplicationForCompanyApi = async ({
  job,
  status,
  sort,
} = {}) => {
  const params = {};
  if (job) params.job = job;
  if (status) params.status = status;
  if (sort) params.sort = sort;

  const response = await api.get("/company", { params });
  return response.data;
};

export const updateApplicationStatusApi = async (applicationId, status) => {
  const response = await api.patch(`/${applicationId}`, { status });
  return response.data;
};
