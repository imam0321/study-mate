import {
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import CategoryForm from "./_components/CategoryForm/CategoryForm";
import CourseAction from "./_components/CourseAction/CourseAction";
import DescriptionForm from "./_components/DescriptionForm/DescriptionForm";
import ImageForm from "./_components/ImageForm/ImageForm";
import ModuleForm from "./_components/ModuleForm/ModuleForm";
import PriceForm from "./_components/PriceForm/PriceForm";
import QuizSetForm from "./_components/QuizSetForm/QuizSetForm";
import TitleForm from "./_components/TitleForm/TitleForm";
import AlertBanner from "@/components/AlertBanner/AlertBanner";
import IconBadge from "@/components/IconBadge/IconBadge";


export default function page() {
  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseAction />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: "Reactive Accelerator",
              }}
              courseId={1}
            />
            <DescriptionForm initialData={{}} courseId={1} />
            <ImageForm initialData={{}} courseId={1} />
            <CategoryForm initialData={{}} courseId={1} />

            <QuizSetForm initialData={{}} courseId={1} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModuleForm initialData={[]} courseId={[]} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm initialData={{}} courseId={1} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
