"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon, GripVerticalIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { SchoolContext } from "../_components/school-context";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

const schema = z.object({
  enrollments: z.array(
    z.object({
      userId: z.string(),
      role: z.string(),
    })
  ),
});

type Schema = z.infer<typeof schema>;

export function EnrollmentsSortable() {
  const { school } = useContext(SchoolContext);

  const enrollments = useQuery(api.schools.getEnrollments, {
    schoolId: school._id,
  });
  const deleteEnrollment = useMutation(api.schools.deleteEnrollment);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      enrollments: enrollments,
    },
  });

  useEffect(() => {
    if (enrollments && enrollments !== form.getValues().enrollments) {
      form.reset({ enrollments: enrollments });
    }
  }, [enrollments, form]);

  function onSubmit(input: Schema) {
    console.log({ input });
  }

  async function onDelete(index: number) {
    try {
      await deleteEnrollment({
        schoolId: school._id as Id<"schools">,
        userId: form.getValues().enrollments[index].userId as Id<"users">,
      });
      remove(index);
    } catch (error) {
      console.error(error);
    }
  }

  const { fields, move, remove } = useFieldArray({
    control: form.control,
    name: "enrollments",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Sortable
          value={fields}
          onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
          overlay={
            <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
              <div className="h-10 w-full rounded-sm bg-muted/40" />
              <div className="h-10 w-full rounded-sm bg-muted/40" />
              <div className="size-10 shrink-0 rounded-sm bg-muted/40" />
              <div className="size-10 shrink-0 rounded-sm bg-muted/40" />
            </div>
          }
        >
          <div className="flex w-full flex-col gap-2">
            {fields.map((field, index) => (
              <SortableItem key={field.id} value={field.id} asChild>
                <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`enrollments.${index}.userId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`enrollments.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <SortableDragHandle variant="outline" size="icon">
                    <GripVerticalIcon className="size-4" aria-hidden="true" />
                  </SortableDragHandle>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(index)}
                  >
                    <TrashIcon
                      className="size-4 text-destructive"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </form>
    </Form>
  );
}
