"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/loader-button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { shapeErrors } from "@/utils/errors";

const updateDescriptionSchema = z.object({
  description: z.string().max(100, { message: "Description is too long" }),
});

export function UpdateDescriptionForm() {
  const { school } = useSchool();
  const updateSchool = useMutation(api.schools.updateSchool);

  const form = useForm<z.infer<typeof updateDescriptionSchema>>({
    resolver: zodResolver(updateDescriptionSchema),
    defaultValues: {
      description: school?.description,
    },
  });

  useEffect(() => {
    form.reset({ description: school?.description });
  }, [school?.description, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateDescriptionSchema>) {
    if (!school) return;

    try {
      await updateSchool({
        schoolId: school._id,
        description: values.description,
      });
      toast.success("Updated school description!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);

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
                  className="h-[125px] resize-none"
                  placeholder="Provide a detailed description of the school."
                />
              </FormControl>
              <FormMessage className="md:absolute" />
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
