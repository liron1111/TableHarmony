"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";

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
import { PublicError, shapeErrors } from "@/utils/errors";
import { useParams } from "next/navigation";

const formSchema = z.object({
  image: z.instanceof(FileList),
});

export function UpdateImageForm() {
  const { courseId } = useParams();

  const updateCourse = useMutation(api.courses.updateCourse);
  const generateUploadUrl = useMutation(api.util.generateUploadUrl);

  const client = useConvex();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const file = values.image[0];
      if (!file) throw new PublicError("No file selected");

      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) throw new PublicError("Failed to upload image");

      const { storageId } = await result.json();

      const imageUrl = await client.query(api.util.getImageUrl, { storageId });

      if (!imageUrl) throw new PublicError("Failed to get image url");

      await updateCourse({
        courseId: courseId as Id<"courses">,
        image: imageUrl,
      });

      toast.success("Updated course");
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
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
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
