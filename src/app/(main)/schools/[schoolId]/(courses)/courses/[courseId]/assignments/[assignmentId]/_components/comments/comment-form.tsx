"use client";

import { api } from "../../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../../convex/_generated/dataModel";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "convex/react";

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
import { shapeErrors } from "@/utils/errors";

const formSchema = z.object({
  comment: z.string().max(100),
});

export function CommentForm({
  assignmentId,
}: {
  assignmentId: Id<"courseAssignments">;
}) {
  const createComment = useMutation(
    api.courseAssignmentsComments.createCourseAssignmentComment
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createComment({
        assignmentId: assignmentId,
        comment: values.comment,
      });
      toast.success("Comment created!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Comment</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  className="h-[75px] resize-none"
                  placeholder="Add a comment"
                />
              </FormControl>
              <FormMessage className="md:absolute" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoaderButton isLoading={isLoading}>Send</LoaderButton>
        </div>
      </form>
    </Form>
  );
}
