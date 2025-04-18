import { columns } from "./_components/Columns/Columns";
import DataTable from "./_components/DataTable/DataTable";


const courses = [
  {
    id: 1,
    title: "Reactive Accelerator",
    price: 49,
    isPublished: true,
  },
  {
    id: 2,
    title: "Think In A Redux Way",
    price: 10,
    isPublished: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={courses} />
    </div>
  )
}
