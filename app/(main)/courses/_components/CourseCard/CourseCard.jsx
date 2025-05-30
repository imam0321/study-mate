import { auth } from "@/auth";
import EnrollCourse from "@/components/EnrollCourse/EnrollCourse";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { hasEnrollmentsForCourse } from "@/queries/enrollment";
import { getUserByEmail } from "@/queries/users";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function CourseCard({ course }) {
  const session = await auth();
  const loggedInUser = await getUserByEmail(session?.user?.email);

  const hasEnrollment = await hasEnrollmentsForCourse(course?.id, loggedInUser?.id);

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3">
      <Link key={course.id} href={`/courses/${course.id}`}>
        <div>
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={`/assets/images/courses/${course.thumbnail}`}
              alt={course.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
              {course.title}
            </div>
            <p className="text-xs text-muted-foreground">{course?.category?.title}</p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                  <BookOpen className="w-4" />
                </div>
                <span>{course?.modules?.length} Chapters</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(course?.price)}
        </p>
        {hasEnrollment ? (
          <Button
            type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Access Course
            <ArrowRight className="w-3" />
          </Button>

        ) : (
          <EnrollCourse asLink={true} session={session} courseId={course?.id} />
        )}
      </div>
    </div>
  )
}
