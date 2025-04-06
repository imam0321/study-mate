import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatMyDate } from '@/lib/date';
import Image from 'next/image';
import CourseInstructor from './CourseInstructor/CourseInstructor';
import CourseCurriculum from './CourseCurriculum/CourseCurriculum';
import CourseOverview from './CourseOverview/CourseOverview';

export default function CourseDetails({ course }) {
  const lastModifiedDate = formatMyDate(course?.modifiedOn)
  console.log(course);

  return (
    <section className="py-8 md:py-12 lg:py-20">
      <div className="container">
        <span className="bg-green-500 px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
          {course?.category?.title}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {course?.title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">
          {course?.subtitle}
        </p>
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={50}
              height={50}
              src={course?.instructor?.profilePicture}
              alt={course?.instructor?.firstName}
            />
            <p className="font-bold">{course?.instructor?.firstName}{" "}{course?.instructor?.lastName}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 font-semibold">Last Updated: </span>
            <span>{lastModifiedDate}</span>
          </div>
        </div>

        {/* Tab */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Carriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <CourseOverview />
            </TabsContent>
            <TabsContent value="curriculum">
              <CourseCurriculum />
            </TabsContent>
            <TabsContent value="instructor">
              <CourseInstructor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
