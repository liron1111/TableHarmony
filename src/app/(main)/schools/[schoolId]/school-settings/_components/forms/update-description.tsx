"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { SchoolContext } from "../../../_components/school-context";

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
import { Textarea } from "@/components/ui/textarea";

const updateDescriptionSchema = z.object({
  description: z.string(),
});

export function UpdateDescriptionForm() {
  const { school } = useContext(SchoolContext);
  const updateSchool = useMutation(api.schools.updateSchool);

  const form = useForm<z.infer<typeof updateDescriptionSchema>>({
    resolver: zodResolver(updateDescriptionSchema),
    defaultValues: {
      description: school.description,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateDescriptionSchema>) {
    try {
      await updateSchool({
        schoolId: school._id,
        description: values.description,
      });
      toast.success("Updated school description!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  className="h-[200px]"
                  placeholder="Provide a detailed description of the school."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoaderButton isLoading={isLoading}>Save</LoaderButton>
        </div>
      </form>
    </Form>
  );
}