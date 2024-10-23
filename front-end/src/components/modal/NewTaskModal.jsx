import { useState } from "react";
import TaskService from "../service/TaskService";

export default function NewTaskModal({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      console.log(token);
      await TaskService.createTask(formData, token);
      setFormData({
        title: "",
        description: "",
        priority: "",
      });
      setIsOpen(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-mantle border border-surface-2 p-6 rounded shadow-lg w-1/2 max-h-screen">
            <div className="flex">
              <h1 className="font-semibold text-text text-2xl">
                Create new task!
              </h1>
              <button
                className=" px-2 ml-auto transition-all font-semibold border-2 text-surface-2 border-surface-2 rounded-full hover:text-crust hover:bg-red hover:border-transparent"
                onClick={setIsOpen}
              >
                X
              </button>
            </div>
            <div className="block">
              <form className="block" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1 w-full"
                  maxLength={40}
                  required
                />
                <br />
                <textarea
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1 w-full"
                  rows={5}
                  maxLength={200}
                  required
                />
                <br />
                <label className="text-subtext-1 mr-2">Priority:</label>
                <select
                  className={`bg-mantle text-subtext-1`}
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option className="text-green font-semibold" value="Low">
                    Low
                  </option>
                  <option className="text-yellow font-semibold" value="Medium">
                    Medium
                  </option>
                  <option className="text-red font-semibold" value="High">
                    High
                  </option>
                </select>
                <br />
                <input
                  type="submit"
                  className="bg-mantle p-2 rounded-lg text-subtext-1 text-xl border-2 border-transparent transition-all hover:bg-green hover:text-crust cursor-pointer mt-2"
                  value="Create Task"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
