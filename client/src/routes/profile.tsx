import { userOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { data, isPending, isError, error } = useQuery(userOptions());
  console.log(data);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <p>{`Welcome back ${data.user?.username}`}</p>
    </div>
  );
}
