import { queryOptions } from "@tanstack/react-query";
import { AppRouter } from "../../../server/src/index";
import { hc } from "hono/client";

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

export const getJobs = async () => {
  const response = await client.api.job.$get();
  const result = response.json();

  return result;
};

export const deleteJob = async (id: string) => {
  try {
    const response = await client.api.job[":id"].$delete({
      param: {
        id,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
