"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";

const updateNameSchema = z.object({
  name: z.string(),
});

export function UpdateNameForm({ schoolId }: { schoolId: Id<"schools"> }) {
  const { toast } = useToast();

  const updateSchool = useMutation(api.schools.updateSchool);

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: "", //TODO: default value
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateNameSchema>) {
    try {
      await updateSchool({ schoolId, name: values.name });
      toast({ description: "Name successfully updated!", variant: "success" });
    } catch (error) {
      console.error(error);
      toast({ description: "Something went wrong", variant: "destructive" });

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
                <Input disabled={isLoading} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isLoading}>Save</LoaderButton>
      </form>
    </Form>
  );
}