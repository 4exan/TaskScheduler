import React, { useState, useEffect } from "react";
import TaskService from "../service/TaskService";

export default function ({ task, key }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const setPriorityColor = (priority) => {
    if (task.priority === "High") {
      return `text-red`;
    } else if (task.priority === "Medium") {
      return `text-yellow`;
    } else {
      return `text-green`;
    }
  };

  const handleSetCompleted = async () => {
    setIsCompleted(() => !isCompleted);
    try {
      const token = localStorage.getItem("token");
      await TaskService.toggleComplete(task.id, token);
    } catch (e) {
      throw e;
    }
  };

  const handleEditTask = () => {};

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await TaskService.deleteTask(task.id, token);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div className="flex">
        <div
          className={`${isCompleted ? `bg-opacity-40 hover:bg-opacity-100` : `bg-opacity-100`} p-2 mt-2 bg-mantle rounded-l-lg w-1/2`}
        >
          <div className="border-b border-subtext-0 flex">
            <h1 className="text-2xl text-text font-semibold overflow-auto break-words ">
              {task.title}
            </h1>
            <h1
              className={`${setPriorityColor(task.priority)} text-2xl font-semibold ml-auto mr-2`}
            >
              {isCompleted ? `Completed` : `${task.priority}`}
            </h1>
          </div>
          <div className="h-fit">
            <p className="text-lg text-subtext-1 overflow-auto break-words">
              {task.description}
            </p>
          </div>
        </div>
        <div
          className={`${isCompleted ? `opacity-40 hover:opacity-100` : `opacity-100`} mt-2 px-2 w-6 bg-mantle rounded-r-lg flex items-center transition-all hover:w-fit`}
        >
          <p className="text-xl text-subtext-1 font-semibold">{`>`}</p>
          <ul className="inline overflow-hidden mx-2 max-h-12">
            <li className="inline mr-2 overflow-hidden min-w-fit">
              <button
                className="bg-mauve p-2 rounded-lg transition-all hover:bg-green overflow-hidden"
                onClick={handleSetCompleted}
              >
                {isCompleted ? `Set not completed` : "Set completed"}
              </button>
            </li>
            <li className="inline mr-2 overflow-hidden">
              <button className="bg-mauve p-2 rounded-lg transition-all hover:bg-blue overflow-hidden">
                Edit
              </button>
            </li>
            <li className="inline overflow-hidden">
              <button
                className="bg-mauve p-2 rounded-lg transition-all hover:bg-red overflow-hidden"
                onClick={handleDeleteTask}
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
