"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
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
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const deleteSchema = z.object({
  confirm: z.string(),
});

export function DeleteSchoolDialog({
  schoolId,
  open,
  setOpen,
}: {
  schoolId: Id<"schools">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteSchool = useMutation(api.schools.deleteSchool);

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      await deleteSchool({ schoolId: schoolId });
      toast.success("Deleted school successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete school</DialogTitle>
          <DialogDescription>
            Please type <span className="font-semibold">Delete school</span> to
            delete this school. After deletion, it can not be recovered.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Delete school</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Delete school"
                      disabled={isLoading}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose
                onClick={() => {
                  form.reset();
                }}
                asChild
              >
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              <LoaderButton
                variant="destructive"
                className="w-full"
                isLoading={isLoading}
              >
                Confirm
              </LoaderButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
