import { Accordion } from '@/components/ui/accordion'
import { BookCheck, Clock10, Radio } from 'lucide-react'
import CourseModuleList from '../CourseModules/CourseModuleList';

export default function CourseCurriculum({ course }) {
  // total course Duration 
  const totalDuration = course?.modules.reduce((acc, obj) => {
    return acc + obj.duration
  }, 0);

  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(totalDuration / 60).toPrecision(2)} Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />1 Live Class
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible
        className="w-full"
      >
        {
          course?.modules && course?.modules.map(module => <CourseModuleList key={module.id} module={module} />)
        }

      </Accordion>
      {/* contents end */}

    </>
  )
}
