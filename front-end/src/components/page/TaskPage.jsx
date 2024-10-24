import React from "react";
import Task from "../common/Task";
import { useState, useEffect } from "react";
import TaskService from "../service/TaskService";
import NewTaskModal from "../modal/NewTaskModal";

export default function TaskPage() {
  const handleAddNewTask = () => {};
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sort, setSort] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sortTasks(tasks);
  }, [sort]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const taskData = await TaskService.getMyTasks(token);
      if (taskData?.taskList) {
        sortTask(taskData.taskList);
        console.log(tasks);
      } else {
        return setTasks(() => null);
      }
      //setTasks(() => taskData.taskList);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sortTask = (rawTasks) => {
    if (sort == "High") {
      rawTasks.filter((task) => task.priority == "High");
    } else if (sort == "Medium") {
      rawTasks.filter((task) => task.priority == "Medium");
    } else if (sort == "Low") {
      rawTasks.filter((task) => task.priority == "Medium");
    }
    setTasks(() => rawTasks);
  };

  const toggleNewTaskModal = () => {
    setModalIsOpen(() => !modalIsOpen);
  };

  const sortTasks = () => {
    switch (sort) {
      case "High":
        return tasks.filter((task) => task.priority === "High");
      case "Medium":
        return tasks.filter((task) => task.priority === "Medium");
      case "Low":
        return tasks.filter((task) => task.priority === "Low");
      case "Completed":
        return tasks.filter((task) => task.completed === true);
      case "All":
      default:
        return tasks;
    }
  };

  return (
    <>
      <NewTaskModal isOpen={modalIsOpen} setIsOpen={toggleNewTaskModal} />

      <div className="p-4 justify-center">
        <div className="bg-rosewater rounded-lg w-fit h-fit py-2 px-10 mx-auto">
          <ul className="flex items-center align-middle justify-center">
            <li className="inline mr-2">
              <button
                className="p-2 border-2 border-transparent bg-mauve rounded-lg transition-all hover:bg-green hover:text-crust hover:border-surface-0"
                onClick={toggleNewTaskModal}
              >
                Add new
              </button>
            </li>
            <li className="inline mr-2">
              <select
                className=" p-2 border-2 border-transparent bg-mauve rounded-lg transition-all hover:cursor-pointer hover:text-crust hover:border-surface-0"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Completed">Completed</option>
              </select>
            </li>
            <li className="inline">
              <button className="p-2 border-2 border-transparent bg-mauve rounded-lg transition-all hover:bg-red hover:text-crust hover:border-surface-0">
                Button
              </button>
            </li>
          </ul>
        </div>
        {tasks && (
          <div className="bg-surface-2 rounded-lg w-full h-full my-2">
            <div className="p-4 block w-full mx-auto">
              {sortTasks().map((task) => (
                <Task task={task} key={task.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
