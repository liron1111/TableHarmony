"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";

import { useCourse } from "../../../../_components/providers/course-provider";

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
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";
import { useParams } from "next/navigation";
import { PublicError } from "@/utils/errors";

const formSchema = z.object({
  comment: z.string().max(500, { message: "Comment is too long" }).optional(),
  file: z.instanceof(FileList),
});

function SubmitAssignmentForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const submitAssignment = useMutation(
    api.courseAssignmentsSubmissions.createSubmission
  );
  const generateUploadUrl = useMutation(api.util.generateUploadUrl);
  const convex = useConvex();

  const { assignmentId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const file = values.file[0];
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) throw new PublicError("Failed to upload file");

      const { storageId } = await result.json();
      const fileUrl = await convex.query(api.util.getImageUrl, {
        storageId,
      });

      if (!fileUrl) throw new PublicError("Failed to get file url");

      await submitAssignment({
        assignmentId: assignmentId as Id<"courseAssignments">,
        comment: values.comment,
        file: fileUrl,
      });

      toast.success("Submitted assignment successfully!");
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
              <FormLabel>Comment (optional)</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isLoading} className="w-full md:w-auto">
            Submit
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function SubmitAssignmentSheet() {
  const [showSheet, setShowSheet] = useState(false);
  const { membership } = useCourse();

  if (membership?.role === "manager") return null;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>Submit</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Submit assignment</SheetTitle>
          <SheetDescription>
            Fill in the details below to submit the assignment.
          </SheetDescription>
        </SheetHeader>
        <SubmitAssignmentForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
