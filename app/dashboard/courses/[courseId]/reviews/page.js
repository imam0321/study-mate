import { columns } from "./_components/Columns/Columns";
import DataTable from "./_components/DataTable/DataTable";


const reviews = [
  {
    id: 1,
    student: { name: "John Doe" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
  {
    id: 1,
    student: { name: "John Smilga" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
];

export default function ReviewsPage() {
  return (
    <div className="p-6">
      <h2>Think in a Redux way reviews</h2>
      <DataTable columns={columns} data={reviews} />
    </div>
  )
}
