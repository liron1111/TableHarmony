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
import { Switch } from "@/components/ui/switch";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(2),
  isPublic: z.boolean().default(false),
  description: z.string({
    message: "Description is required",
  }),
});

function CreateSchoolForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const createSchool = useMutation(api.schools.createSchool);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPublic: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createSchool({
        name: values.name,
        description: values.description,
        isPublic: values.isPublic,
      });
      toast.success("Created school successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
                  placeholder="Enter school name"
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
                  placeholder="Provide a detailed description of the school."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is public</FormLabel>
                <FormDescription>
                  Make the school publicly visible to everyone.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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

export function CreateSchoolSheet() {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>New school</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create school</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new school.
          </SheetDescription>
        </SheetHeader>
        <CreateSchoolForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
