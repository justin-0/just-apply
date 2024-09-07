import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { client } from "../lib/api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    const getMe = async () => {
      const response = await client.api.me.$get();

      const result = await response.json();

      console.log(result);
    };

    getMe();
  }, []);

  return (
    <div className="text-3xl underline">
      <h1>Track, Edit, and Manage Your Job Hunt Easily</h1>
    </div>
  );
}
