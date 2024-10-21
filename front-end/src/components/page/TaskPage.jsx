import React from "react";
import Task from "../common/Task";

export default function TaskPage() {
  const handleAddNewTask = () => {};

  return (
    <>
      <div className="p-4 justify-center">
        <div className="bg-rosewater rounded-lg w-fit h-fit py-2 px-10 mx-auto">
          <ul className="flex items-center align-middle justify-center">
            <li className="inline mr-2">
              <button
                className="p-2 border-2 border-transparent bg-mauve rounded-lg transition-all hover:bg-green hover:text-crust hover:border-surface-0"
                onClick={handleAddNewTask}
              >
                Add new
              </button>
            </li>
            <li className="inline mr-2">
              <button className="p-2 border-2 border-transparent bg-mauve rounded-lg transition-all hover:bg-blue hover:text-crust hover:border-surface-0">
                Sort
              </button>
            </li>
            <li className="inline">
              <button className="p-2 border-2 border-transparent bg-mauve rounded-lg transition-all hover:bg-red hover:text-crust hover:border-surface-0">
                Add new
              </button>
            </li>
          </ul>
        </div>
        <div className="bg-surface-2 rounded-lg w-full h-full my-2">
          <div className="p-4 block w-full mx-auto">
            <Task
              title="Test title"
              description="Test description for high priority test task"
              priority="High"
              isCompleted="false"
            />
            <Task
              title="Another test title"
              description="Description for task with low priority, that means that priority text must be green."
              priority="Low"
              isCompleted="false"
            />
            <Task
              title="Third task, i dont know where its going to be LOL"
              description="Some description for another task"
              priority="Medium"
              isCompleted="false"
            />
          </div>
        </div>
      </div>
    </>
  );
}
