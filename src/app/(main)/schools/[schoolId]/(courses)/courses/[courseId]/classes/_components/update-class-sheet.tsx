"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/loader-button";
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/ui/time-picker";
import { startOfToday } from "date-fns";

const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const formSchema = z.object({
  day: z.enum(DAYS_OF_WEEK as [string, ...string[]]),
  from: z.date(),
  to: z.date(),
});

function UpdateClassForm({
  classId,
  setShowSheet,
}: {
  classId: Id<"classes">;
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const updateClass = useMutation(api.classes.updateClass);
  const classData = useQuery(api.classes.getClass, { classId });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!classData) return;

    const to = new Date(classData.to + startOfToday().getTime());
    const from = new Date(classData.from + startOfToday().getTime());

    form.reset({
      day: classData.day,
      from,
      to,
    });
  }, [classData, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!classData) return;

    try {
      await updateClass({
        classId,
        // @ts-ignore
        day: values.day,
        from: values.from.getTime(),
        to: values.to.getTime(),
      });
      toast.success("Updated class successfully!");
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
          name="day"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Day</FormLabel>
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
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className="sr-only">From</FormLabel>
                <FormControl>
                  <TimePicker date={field.value} setDate={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-center pt-3">→</div>
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem {...field}>
                <FormLabel className="sr-only">To</FormLabel>
                <FormControl>
                  <TimePicker date={field.value} setDate={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isLoading} className="w-full md:w-auto">
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function UpdateClassSheet({
  classId,
  children,
}: {
  classId: Id<"classes">;
  children: React.ReactNode;
}) {
  const [showSheet, setShowSheet] = useState(false);
  const { membership } = useMembership();
  const { membership: courseMembership } = useCourse();

  if (courseMembership?.role !== "manager" && membership?.role !== "manager")
    return null;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit class</SheetTitle>
          <SheetDescription>
            Fill in the details below to edit the class.
          </SheetDescription>
        </SheetHeader>
        <UpdateClassForm classId={classId} setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
