import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../../../../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function CourseCard({ course }: { course: Doc<"courses"> }) {
  return (
    <div className="relative rounded-md transition-all duration-200 hover:shadow-md dark:border dark:hover:border-white">
      <Link href={`/schools/${course.schoolId}/courses/${course._id}`}>
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center gap-4 p-2">
            <Avatar>
              <AvatarImage src={course.image} alt="Course" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-semibold">{course.name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {course.description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
