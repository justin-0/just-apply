import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AppRouter } from "../../../server/src/index";
import { hc } from "hono/client";
import { useNavigate } from "@tanstack/react-router";

export const client = hc<AppRouter>("/");

const currentUser = async () => {
  const response = await client.api.me.$get();
  const result = await response.json();

  return result;
};

export const userOptions = () => {
  return queryOptions({
    queryKey: ["get-current-user"],
    queryFn: () => currentUser(),
    staleTime: Infinity,
  });
};

const currentJobs = async () => {
  const response = await client.api.job.$get();
  const result = await response.json();

  return result;
};

export const getJobsOptions = () => {
  return queryOptions({
    queryKey: ["get-all-jobs"],
    queryFn: () => currentJobs(),
  });
};

export const deleteJob = async (id: string) => {
  const response = await client.api.job[":id"].$delete({
    param: {
      id,
    },
  });
  const result = await response.json();
  return result;
};

export const useDeleteJobMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["get-all-jobs"] });
      // Refresh the current page
      navigate({ to: "/overview" });
    },
  });
};
