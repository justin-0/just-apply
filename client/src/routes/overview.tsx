import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table/data-table";
import { columns, Payment } from "@/components/data-table/columns";

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
    {
      id: "728ed52f",
      amount: 1100,
      status: "pending",
      email: "z@example.com",
    },
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
