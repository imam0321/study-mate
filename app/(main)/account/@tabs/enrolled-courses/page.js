import { auth } from "@/auth";
import EnrolledCourseCard from "../../_components/EnrolledCourseCard/EnrolledCourseCard";
import { redirect } from "next/navigation";
import { getEnrollmentsForUser } from "@/queries/enrollment";
import { getUserByEmail } from "@/queries/users";

export default async function EnrolledCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const loggedInUser = await getUserByEmail(session?.user?.email);

  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);
  console.log(enrollments);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        enrollments.map((enrollment) => (
          <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <p>No Enrollment found</p>
      )}
    </div>
  );
}
