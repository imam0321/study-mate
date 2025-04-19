
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LayoutDashboard } from "lucide-react";
import { Eye } from "lucide-react";
import { Video } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import IconBadge from "@/components/IconBadge/IconBadge";
import CourseAction from "../../../../_components/CourseAction/CourseAction";
import LessonTitleForm from "../LessonTitleForm/LessonTitleForm";
import LessonDescriptionForm from "../LessonDescriptionForm/LessonDescriptionForm";
import LessonAccessForm from "../LessonAccessForm/LessonAccessForm";
import VideoUrlForm from "../VideoUrlForm/VideoUrlForm";

export default function LessonModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        className="sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link
                href={`/dashboard/courses/${1}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Link>
              <div className="flex items-center justify-end">
                <CourseAction />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize Your chapter</h2>
                </div>
                <LessonTitleForm
                  initialData={{}}
                  courseId={"1"}
                  lessonId={"1"}
                />
                <LessonDescriptionForm
                  initialData={{}}
                  courseId={"1"}
                  lessonId={"1"}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <LessonAccessForm
                  initialData={{}}
                  courseId={"1"}
                  chapterId={"1"}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <VideoUrlForm
                initialData={{
                  url: "https://www.youtube.com/embed/Cn4G2lZ_g2I?si=8FxqU8_NU6rYOrG1",
                }}
                courseId={1}
                lessonId={1}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
