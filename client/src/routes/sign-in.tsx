import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: Signin,
});

function Signin() {
  return <div>Sign in</div>;
}
