"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import { useClassroom } from "@/app/(main)/schools/[schoolId]/(main)/classrooms/[classroomId]/_components/providers/classroom-provider";

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
  description: z.string().max(50),
});

export function UpdateDescriptionForm() {
  const { classroom } = useClassroom();
  const updateClassroom = useMutation(api.classrooms.updateClassroom);

  const form = useForm<z.infer<typeof updateDescriptionSchema>>({
    resolver: zodResolver(updateDescriptionSchema),
    defaultValues: {
      description: classroom?.description,
    },
  });

  useEffect(() => {
    form.reset({ description: classroom?.description });
  }, [classroom?.description, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateDescriptionSchema>) {
    if (!classroom) return;

    try {
      await updateClassroom({
        classroomId: classroom._id,
        description: values.description,
      });
      toast.success("Updated classroom description!");
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
                  placeholder="Provide a detailed description of the classroom."
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
