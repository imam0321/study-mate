// import { CourseProgress } from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import { getCategoryDetails } from "@/queries/categories";
import { getReport } from "@/queries/reports";
import { BookOpen } from "lucide-react";
import Image from "next/image";

export default async function EnrolledCourseCard({ enrollment }) {
  const courseCategory = await getCategoryDetails(enrollment?.course?.category);

  const filter = { course: enrollment?.course?._id, student: enrollment?.student?._id };

  const report = await getReport(filter);

  // total completed modules 
  const totalCompletedModules = report?.totalCompletedModeules?.length || 0;

  // get all quizzes and assessments
  const quizzes = report?.quizAssessment?.assessments || [];
  const totalQuizzes = quizzes?.length

  // find attempted quizzes 
  const quizzesTaken = quizzes?.filter(q => q.attempted) || [];

  // find how may quizzes answered correct
  const totalCorrect = quizzesTaken.map(quiz => {
    const item = quiz?.options;
    return item.filter(o => {
      return o.isCorrect === true && o.isSelected === true
    })
  }).filter(elem => elem.length > 0).flat()
  
  const marksFromQuizzes = totalCorrect?.length * 5 || 0;

  // other marks 
  const otherMarks = report?.quizAssessment?.otherMarks || 0;

  // total marks 
  const totalMarks = (marksFromQuizzes + otherMarks) || 0;

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={`/assets/images/courses/${enrollment?.course?.thumbnail}`}
          alt={enrollment?.course?.title}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {enrollment?.course?.title}
        </div>
        <p className="text-xs text-muted-foreground">{courseCategory?.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{enrollment?.course?.modules.length} Chapters</span>
          </div>
        </div>
        <div className=" border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Modules: {enrollment?.course?.modules.length}
            </p>
            <p className="text-md md:text-sm font-medium text-slate-700">
              Completed Modules <Badge variant="success">{totalCompletedModules}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: {totalQuizzes}
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              Quiz taken <Badge variant="success">{quizzesTaken.length}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {marksFromQuizzes}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Others
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {otherMarks}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </p>

          <p className="text-md md:text-sm font-medium text-slate-700">{totalMarks}</p>
        </div>

        {/* <CourseProgress
            size="sm"
            value={80}
            variant={110 === 100 ? "success" : ""}
          /> */}
      </div>
    </div>
  )
}
