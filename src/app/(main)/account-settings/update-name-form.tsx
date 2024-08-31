"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/loader-button";
import { toast } from "sonner";
import { useEffect } from "react";

const updateNameSchema = z.object({
  name: z.string(),
});

export function UpdateNameForm() {
  const user = useQuery(api.users.getCurrentUser);
  const updateUser = useMutation(api.users.updateUser);

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  useEffect(() => {
    if (user?.name && user.name !== form.getValues().name) {
      form.reset({ name: user.name });
    }
  }, [user?.name, form]);

  const isPending = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateNameSchema>) {
    try {
      await updateUser({ clerkId: user?.clerkId!, name: values.name });
      toast.success("Updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-md gap-2 space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending}>Save</LoaderButton>
      </form>
    </Form>
  );
}
