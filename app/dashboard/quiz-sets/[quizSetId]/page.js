"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";
import AlertBanner from "@/components/AlertBanner/AlertBanner";
import QuizSetAction from "./_components/QuizSetAction/QuizSetAction";
import TitleForm from "./_components/TitleForm/TitleForm";
import AddQuizForm from "./_components/AddQuizForm/AddQuizForm";

const initialQuizes = [
  {
    id: 1,
    title: "What is HTML ?",
    options: [
      {
        label: "A programming language",
        isTrue: false,
      },
      {
        label: "A markup language",
        isTrue: true,
      },
      {
        label: "A famous book",
        isTrue: false,
      },
      {
        label: "A famous tv show",
        isTrue: false,
      },
    ],
  },
  {
    id: 2,
    title: "What is Javascript ?",
    options: [
      {
        label: "A programming language",
        isTrue: true,
      },
      {
        label: "A markup language",
        isTrue: false,
      },
      {
        label: "A famous book",
        isTrue: false,
      },
      {
        label: "A famous tv show",
        isTrue: false,
      },
    ],
  },
];

export default function EditQuizSetPage() {
  const [quizes, setQuizes] = useState(initialQuizes);
  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
          {/* Quiz List */}
          <div className="max-lg:order-2">
            <h2 className="text-xl mb-6">Quiz List</h2>
            <AlertBanner
              label="No Quiz are in the set, add some using the form above."
              variant="warning"
              className="rounded mb-6"
            />
            <div className="space-y-6">
              {quizes.map((quiz) => {
                return (
                  <div
                    key={quiz.id}
                    className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border"
                  >
                    <h2 className="mb-3">{quiz.title}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quiz.options.map((option) => {
                        return (
                          <div
                            className={cn(
                              "py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600"
                            )}
                            key={option.label}
                          >
                            {option.isTrue ? (
                              <CircleCheck className="size-4 text-emerald-500 " />
                            ) : (
                              <Circle className="size-4" />
                            )}

                            <p>{option.label}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-6">
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-3 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        className="text-destructive"
                        variant="ghost"
                      >
                        <Trash className="w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/*  */}
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your quiz set</h2>
            </div>
            <div className="max-w-[800px]">
              <TitleForm
                initialData={{
                  title: "Reactive Accelerator",
                }}
              />
            </div>

            <div className="max-w-[800px]">
              <AddQuizForm setQuizes={setQuizes} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
