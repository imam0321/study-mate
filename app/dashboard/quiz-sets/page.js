import { columns } from "./_components/Columns/Columns";
import DataTable from "./_components/DataTable/DataTable";

const quizSets = [
  {
    id: 1,
    title: "Reactive Accelerator",
    isPublished: true,
    totalQuiz: 10,
    quizes: [],
  },
  {
    id: 2,
    title: "Think In A Redux Way",
    isPublished: false,
    totalQuiz: 50,
    quizes: [],
  },
];

export default function QuizSetPage() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={quizSets} />
    </div>
  );
}
