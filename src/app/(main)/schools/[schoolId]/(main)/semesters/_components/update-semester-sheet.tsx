"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";

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
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { addDays } from "date-fns";

const formSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(2),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

function UpdateSemesterForm({
  setShowSheet,
  semesterId,
}: {
  semesterId: Id<"semesters">;
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const updateSemester = useMutation(api.semesters.updateSemester);
  const semester = useQuery(api.semesters.getSemester, { semesterId });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: semester?.name,
      dateRange: {
        from: new Date(semester?.from ?? new Date()),
        to: new Date(semester?.to ?? addDays(new Date(), 20)),
      },
    },
  });

  useEffect(() => {
    form.reset({
      name: semester?.name,
      dateRange: {
        from: new Date(semester?.from ?? new Date()),
        to: new Date(semester?.to ?? addDays(new Date(), 20)),
      },
    });
  }, [semester, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateSemester({
        semesterId,
        name: values.name,
        from: values.dateRange.from.getTime(),
        to: values.dateRange.to.getTime(),
      });
      toast.success("Updated semester successfully!");
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
                  placeholder="Enter semester name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Range</FormLabel>
              <FormControl>
                <DatePickerWithRange
                  value={field.value}
                  onChange={field.onChange}
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

export function UpdateSemesterSheet({
  semesterId,
}: {
  semesterId: Id<"semesters">;
}) {
  const [showSheet, setShowSheet] = useState(false);
  const { membership } = useMembership();

  if (membership?.role !== "manager") return null;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>Update semester</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update semester</SheetTitle>
          <SheetDescription>
            Fill in the details below to update the semester.
          </SheetDescription>
        </SheetHeader>
        <UpdateSemesterForm
          setShowSheet={setShowSheet}
          semesterId={semesterId}
        />
      </SheetContent>
    </Sheet>
  );
}
