"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
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
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

const deleteSchema = z.object({
  confirm: z.string().refine((v) => v === "Delete school", {
    message: "Please type 'Delete school' to confirm",
  }),
});

export function DeleteSchoolAlert({
  schoolId,
  children,
}: {
  schoolId: Id<"schools">;
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const deleteSchool = useMutation(api.schools.deleteSchool);

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      await deleteSchool({ schoolId: schoolId });
      toast({
        description: "School successfully deleted!",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({ description: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete school</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this school? <br />
            <span className="text-destructive">
              This action is permanent and irreversible.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type &quot;Delete school&quot; below to continue.
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Delete school"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  form.reset();
                }}
              >
                Cancel
              </AlertDialogCancel>
              <LoaderButton isLoading={isLoading}>Confirm</LoaderButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
