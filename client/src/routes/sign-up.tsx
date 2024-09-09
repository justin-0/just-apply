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

export const Route = createFileRoute("/sign-up")({
  component: Signup,
});

function Signup() {
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
    const response = await client.api.signup.$post({
      json: {
        ...values,
      },
    });

    const result = await response.json();

    // TODO - redirect to profile
    if (result) {
      navigate({ to: "/profile" });
    }

    console.log("USER CREATED: ", result);
  };

  return (
    <div>
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
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
