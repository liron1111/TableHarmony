"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "../../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";
import { EditIcon } from "lucide-react";

const formSchema = z.object({
  comment: z.string().max(100, { message: "Description is too long" }),
});

function EditCommentForm({
  setShowSheet,
  commentId,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
  commentId: Id<"courseAssignmentsComments">;
}) {
  const updateComment = useMutation(
    api.courseAssignmentsComments.updateComment
  );
  const comment = useQuery(api.courseAssignmentsComments.getComment, {
    commentId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (comment) {
      form.setValue("comment", comment.comment);
    }
  }, [comment, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateComment({
        commentId,
        comment: values.comment,
      });

      toast.success("Comment updated successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setShowSheet(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  className="h-[75px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isLoading} className="w-full md:w-auto">
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function EditCommentSheet({
  commentId,
}: {
  commentId: Id<"courseAssignmentsComments">;
}) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Edit comment">
          <EditIcon className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit comment</SheetTitle>
          <SheetDescription>
            Fill in the details below to edit the comment.
          </SheetDescription>
        </SheetHeader>
        <EditCommentForm commentId={commentId} setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
