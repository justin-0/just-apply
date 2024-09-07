import { createFileRoute } from "@tanstack/react-router";
import { client } from "../lib/api";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  return <div>signup</div>;
}
