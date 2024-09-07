import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: Signup,
});

function Signup() {
  return <div>Sign up</div>;
}
