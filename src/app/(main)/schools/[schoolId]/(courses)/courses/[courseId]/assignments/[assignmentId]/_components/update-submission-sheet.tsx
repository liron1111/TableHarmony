"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/loader-button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";
import { PublicError } from "@/utils/errors";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  comment: z.string().max(500, { message: "Comment is too long" }).optional(),
  file: z.instanceof(FileList).optional(),
});

function UpdateSubmissionForm({
  setShowSheet,
  userId,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
  userId: Id<"users">;
}) {
  const updateSubmission = useMutation(
    api.courseAssignmentsSubmissions.updateSubmission
  );
  const { assignmentId } = useParams();
  const submission = useQuery(api.courseAssignmentsSubmissions.getSubmission, {
    assignmentId: assignmentId as Id<"courseAssignments">,
    userId,
  });

  const generateUploadUrl = useMutation(api.util.generateUploadUrl);
  const convex = useConvex();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  //TODO: default values

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!submission) return;

    try {
      let fileUrl: string | undefined = submission.file;

      if (values.file && values.file.length > 0) {
        const file = values.file[0];
        const uploadUrl = await generateUploadUrl();

        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!result.ok) throw new PublicError("Failed to upload file");

        const { storageId } = await result.json();
        const tempFileUrl = await convex.query(api.util.getImageUrl, {
          storageId,
        });

        fileUrl = tempFileUrl ?? undefined;
      }

      await updateSubmission({
        assignmentId: assignmentId as Id<"courseAssignments">,
        userId,
        comment: values.comment,
        file: fileUrl,
      });
      toast.success("Updated submission successfully!");
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
                  className="h-[200px]"
                  placeholder="Add a comment about the submission."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  disabled={isLoading}
                />
              </FormControl>
              {submission?.file && (
                <FormDescription>
                  Current file:{" "}
                  <a
                    href={submission.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    View
                  </a>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isLoading} className="w-full md:w-auto">
            Update
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function UpdateSubmissionSheet({ userId }: { userId: Id<"users"> }) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Button>Update submission</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update submission</SheetTitle>
          <SheetDescription>
            Update your submission details below.
          </SheetDescription>
        </SheetHeader>
        <UpdateSubmissionForm setShowSheet={setShowSheet} userId={userId} />
      </SheetContent>
    </Sheet>
  );
}
