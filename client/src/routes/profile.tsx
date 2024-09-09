"use client";
import { useAuth } from "@/context/authcontext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const auth = useAuth();
  return (
    <div>
      <p>{`Welcome back ${auth.user?.username}`}</p>
    </div>
  );
}
