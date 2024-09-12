"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

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
import { useParams } from "next/navigation";
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

function CreateSemesterForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const createSemester = useMutation(api.semesters.createSemester);
  const { schoolId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 20),
      },
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createSemester({
        schoolId: schoolId as Id<"schools">,
        name: values.name,
        from: values.dateRange.from.getTime(),
        to: values.dateRange.to.getTime(),
      });
      toast.success("Created semester successfully!");
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
            Create
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function CreateSemesterSheet() {
  const [showSheet, setShowSheet] = useState(false);
  const { membership } = useMembership();

  if (membership?.role !== "manager") return null;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>New semester</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create semester</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new semester.
          </SheetDescription>
        </SheetHeader>
        <CreateSemesterForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
