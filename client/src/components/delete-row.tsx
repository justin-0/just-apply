import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Job } from "./data-table/columns";
import { useDeleteJobMutation } from "@/lib/api";

export const DeleteRow = ({ row }: { row: Row<Job> }) => {
  const useJobMutation = useDeleteJobMutation();
  const handleDelete = (id: string) => useJobMutation.mutate(id);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={async () => {
            handleDelete(row.original.id);
          }}
        >
          Delete Application
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit Application</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
