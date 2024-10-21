export default function ({ title, description, priority, isCompleted }) {
  const setPriorityColor = (priority) => {
    if (priority === "High") {
      return `text-red`;
    } else if (priority === "Medium") {
      return `text-yellow`;
    } else {
      return `text-green`;
    }
  };

  return (
    <>
      <div className="flex ">
        <div className="p-2 mt-2 bg-mantle rounded-l-lg w-1/2">
          <div className="border-b border-subtext-0 flex">
            <h1 className="text-2xl text-text font-semibold">{title}</h1>
            <h1
              className={`${setPriorityColor(priority)} text-2xl font-semibold ml-auto mr-2`}
            >
              {priority}
            </h1>
          </div>
          <div>
            <p className="text-lg text-subtext-1">{description}</p>
          </div>
        </div>
        <div className="mt-2 px-2 w-6 bg-mantle rounded-r-lg flex items-center transition-all hover:w-1/5">
          <p className="text-xl text-subtext-1 font-semibold">{`>`}</p>
          <ul className="inline overflow-hidden mx-2 max-h-12">
            <li className="inline mr-2 overflow-hidden min-w-fit">
              <button className="bg-mauve p-2 rounded-lg transition-all hover:bg-green overflow-hidden">
                Set complete
              </button>
            </li>
            <li className="inline mr-2 overflow-hidden">
              <button className="bg-mauve p-2 rounded-lg transition-all hover:bg-blue overflow-hidden">
                Edit
              </button>
            </li>
            <li className="inline overflow-hidden">
              <button className="bg-mauve p-2 rounded-lg transition-all hover:bg-red overflow-hidden">
                Remove
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
