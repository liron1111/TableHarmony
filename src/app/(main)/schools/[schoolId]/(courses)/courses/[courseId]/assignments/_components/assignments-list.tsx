"use client";

import { useParams } from "next/navigation";
import { api } from "../../../../../../../../../../convex/_generated/api";
import {
  Doc,
  Id,
} from "../../../../../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { cardStyles, gridStyles } from "@/styles/common";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format, isPast } from "date-fns";
import { CalendarCheck, CalendarIcon, CalendarX } from "lucide-react";
import { SchoolListSkeleton } from "@/app/(main)/schools/_components/school-list";

function AssignmentCard({
  assignment,
}: {
  assignment: Doc<"courseAssignments">;
}) {
  const { schoolId, courseId } = useParams();
  const isPastAssignment = isPast(assignment.date);

  return (
    <Link
      href={`/schools/${schoolId}/courses/${courseId}/assignments/${assignment._id}`}
      key={assignment._id}
    >
      <Card className="transition-colors hover:bg-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{assignment.title}</span>
            <Badge
              className="capitalize"
              variant={assignment.type === "project" ? "default" : "outline"}
            >
              {assignment.type}
            </Badge>
          </CardTitle>
          <CardDescription className="flex items-center">
            <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
            {format(assignment.date, "LLL dd, HH:mm")}
          </CardDescription>
        </CardHeader>
        <CardContent>{assignment.description}</CardContent>
      </Card>
    </Link>
  );
}

export function AssignmentsList() {
  const { courseId } = useParams();

  const assignments = useQuery(api.courses.getCourseAssignments, {
    courseId: courseId as Id<"courses">,
  });

  if (!assignments) return <SchoolListSkeleton />;

  if (assignments.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No Assignments Available
          </span>
          <p className="text-balance text-muted-foreground">
            There are currently no assignments listed for this course.
          </p>
        </div>
        <Image
          src="/assets/events.svg"
          alt="Empty assignment list"
          width={250}
          height={250}
        />
      </div>
    );
  }

  const upcomingAssignments = assignments.filter((a) => !isPast(a.date));
  const pastAssignments = assignments.filter((a) => isPast(a.date));

  return (
    <div className="space-y-8">
      {upcomingAssignments.length !== 0 && (
        <section>
          <h2 className="mb-4 flex items-center text-xl font-medium">
            <CalendarCheck className="mr-2 size-5" />
            Upcoming Assignments
          </h2>
          <div className={gridStyles}>
            {upcomingAssignments.map((assignment) => (
              <AssignmentCard key={assignment._id} assignment={assignment} />
            ))}
          </div>
        </section>
      )}

      {pastAssignments.length !== 0 && (
        <section>
          <h2 className="mb-4 flex items-center text-xl font-medium">
            <CalendarX className="mr-2 size-5" />
            Past Assignments
          </h2>
          <div className={gridStyles}>
            {pastAssignments.map((assignment) => (
              <AssignmentCard key={assignment._id} assignment={assignment} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
