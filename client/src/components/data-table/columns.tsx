import { ColumnDef } from "@tanstack/react-table";

import { DeleteRow } from "../delete-row";

export type Job = {
  id: string;
  role: string;
  company: string;
  status: string;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DeleteRow row={row} />;
    },
  },
];
