import { columns, Payment } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/overview")({
  component: () => <Overview />,
});

function Overview() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
