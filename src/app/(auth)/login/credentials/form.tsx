"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { credentialsLoginAction } from "./actions";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import Link from "next/link";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export function CredentialsForm() {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(credentialsLoginAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
  });

  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof credentialsSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Enter your email"
                  type="email"
                />
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
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormDescription>
                <Link
                  href="/login/forgot-password"
                  className="text-muted-foreground underline underline-offset-1 hover:text-foreground"
                >
                  Forgot your password
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className="w-full" isLoading={isPending}>
          Sign in with credentials
        </LoaderButton>
      </form>
    </Form>
  );
}