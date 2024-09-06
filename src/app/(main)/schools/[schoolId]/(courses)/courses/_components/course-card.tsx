import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../../../../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export function CourseCard({ course }: { course: Doc<"courses"> }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="-mb-1 size-10">
          <AvatarImage alt="course image" src={course.image} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </div>
        <Button size="icon" variant="ghost" className="ml-auto" asChild>
          <Link href={`/schools/${course.schoolId}/courses/${course._id}`}>
            <ExternalLinkIcon className="size-4" />
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
