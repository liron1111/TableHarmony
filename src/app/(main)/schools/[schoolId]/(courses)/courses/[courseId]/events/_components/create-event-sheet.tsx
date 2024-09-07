"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useCourse } from "../../../_components/providers/course-provider";
import { useMutation } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(2),
  description: z
    .string({
      message: "Description is required",
    })
    .max(50),
  type: z.enum(["exam", "assignment"]),
});

function CreateEventForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const createEvent = useMutation(api.courseEvents.createCourseEvent);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "assignment",
    },
  });

  const { course } = useCourse();

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!course) return;

    try {
      await createEvent({
        courseId: course._id,
        name: values.name,
        description: values.description,
        type: "exam",
        startDate: Date.now(),
        endDate: Date.now(),
      });
      toast.success("Created event successfully!");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Enter event name"
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
                  placeholder="Provide a detailed description of the event."
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
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["exam", "assignment"].map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
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

export function CreateEventSheet() {
  const [showSheet, setShowSheet] = useState(false);

  const { membership } = useCourse();

  if (membership?.role !== "manager") {
    return null;
  }

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>New event</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create event</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new event.
          </SheetDescription>
        </SheetHeader>
        <CreateEventForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
