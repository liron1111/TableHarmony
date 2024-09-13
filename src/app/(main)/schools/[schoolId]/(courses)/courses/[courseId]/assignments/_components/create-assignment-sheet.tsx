"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { useConvex, useMutation } from "convex/react";

import { useCourse } from "../../../_components/providers/course-provider";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/ui/time-picker";
import { cn } from "@/lib/utils";
import { addDays, format, startOfToday } from "date-fns";
import { PublicError } from "@/utils/errors";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  description: z.string().max(500, { message: "Description is too long" }),
  type: z.enum(["project", "homework"]),
  date: z.date(),
  file: z.instanceof(FileList).optional(),
});

function CreateAssignmentForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const createAssignment = useMutation(
    api.courseAssignments.createCourseAssignment
  );
  const generateUploadUrl = useMutation(api.util.generateUploadUrl);
  const convex = useConvex();

  const { courseId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "homework",
      date: addDays(startOfToday(), 7),
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let fileUrl: string | undefined;

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
        fileUrl = (await convex.query(api.util.getImageUrl, {
          storageId,
        })) as string;

        if (!fileUrl) throw new PublicError("Failed to get file url");
      }

      await createAssignment({
        courseId: courseId as Id<"courses">,
        title: values.title,
        description: values.description,
        type: values.type,
        date: values.date.getTime(),
        file: fileUrl,
      });

      toast.success("Created assignment successfully!");
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Enter assignment title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  className="h-[200px]"
                  placeholder="Provide a detailed description of the assignment."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["project", "homework"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Date</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    fromDate={startOfToday()}
                  />
                  <div className="border-t border-border p-3">
                    <TimePicker setDate={field.onChange} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File (Optional)</FormLabel>
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
            Create
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function CreateAssignmentSheet() {
  const [showSheet, setShowSheet] = useState(false);
  const { membership } = useCourse();

  if (membership?.role !== "manager") return null;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>New assignment</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create assignment</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new assignment.
          </SheetDescription>
        </SheetHeader>
        <CreateAssignmentForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
