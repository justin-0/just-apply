import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { credentialsSchema } from "@/types/schema";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/api";

export const Route = createFileRoute("/sign-in")({
  component: Signin,
});

function Signin() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof credentialsSchema>) => {
    console.log(values);
    const response = await client.api.login.$post({
      json: {
        ...values,
      },
    });

    const result = await response.json();

    // TODO - redirect to profile
    if (result) {
      navigate({ to: "/profile" });
    }
  };

  return (
    <div>
      <h4>Sign in</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting}>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
