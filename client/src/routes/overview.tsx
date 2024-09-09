import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/api";

export const Route = createFileRoute("/overview")({
  component: () => <Overview />,
});

function Overview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-jobs"],
    queryFn: () => getJobs(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {data && data.jobs ? (
        <DataTable columns={columns} data={data.jobs} />
      ) : (
        <div>No jobs data available</div>
      )}
    </div>
  );
}
