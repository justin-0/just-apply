import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="text-3xl underline">
      <h1>Track, Edit, and Manage Your Job Hunt Easily</h1>
    </div>
  );
}
