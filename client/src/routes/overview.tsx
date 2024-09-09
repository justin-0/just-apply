import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { useQuery } from "@tanstack/react-query";
import { getJobsOptions } from "@/lib/api";

export const Route = createFileRoute("/overview")({
  component: () => <Overview />,
});

function Overview() {
  const { data } = useQuery(getJobsOptions());

  if (!data) {
    return;
  }
  return (
    <div>
      <DataTable columns={columns} data={data.jobs} />
    </div>
  );
}
