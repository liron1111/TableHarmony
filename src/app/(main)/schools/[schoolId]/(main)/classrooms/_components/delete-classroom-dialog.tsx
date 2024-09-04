"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaClose,
  CredenzaBody,
} from "@/components/ui/credenza";
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
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { shapeErrors } from "@/utils/errors";

const deleteSchema = z.object({
  confirm: z.string().refine((v) => v === "Delete classroom", {
    message: "Please type 'Delete classroom' to confirm",
  }),
});

export function DeleteClassroomDialog({
  classroomId,
  open,
  setOpen,
}: {
  classroomId: Id<"classrooms">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteClassroom = useMutation(api.classrooms.deleteClassroom);

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      await deleteClassroom({ classroomId: classroomId });
      toast.success("Deleted classroom successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setOpen(false);
  };

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete classroom</CredenzaTitle>
          <CredenzaDescription>
            Please type <span className="font-semibold">Delete classroom</span>{" "}
            to delete this classroom. After deletion, it can not be recovered.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Delete classroom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Delete classroom"
                        disabled={isLoading}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CredenzaBody>
        <CredenzaFooter className="flex flex-row">
          <CredenzaClose asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </CredenzaClose>
          <LoaderButton
            variant="destructive"
            className="w-full"
            isLoading={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
          </LoaderButton>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
