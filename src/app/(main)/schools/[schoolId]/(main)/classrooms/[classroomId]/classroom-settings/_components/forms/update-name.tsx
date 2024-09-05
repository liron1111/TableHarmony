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
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/loader-button";
import { toast } from "sonner";
import { useEffect } from "react";
import { shapeErrors } from "@/utils/errors";

const updateNameSchema = z.object({
  name: z.string().min(2).max(50),
});

export function UpdateNameForm() {
  const { classroom } = useClassroom();
  const updateClassroom = useMutation(api.classrooms.updateClassroom);

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: classroom?.name,
    },
  });

  useEffect(() => {
    form.reset({ name: classroom?.name });
  }, [classroom?.name, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof updateNameSchema>) {
    if (!classroom) return;

    try {
      await updateClassroom({
        classroomId: classroom._id,
        name: values.name,
      });
      toast.success("Updated classroom name!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);

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
