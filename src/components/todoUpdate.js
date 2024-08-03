import { useState, useEffect } from "react";
const { todoUpdation } = require("../apis/todoApi");

const UpdateTodo = ({ details, update, onClose }) => {
  const [nameOfTodo, setNameOfTodo] = useState(details?.todoName || "");

  useEffect(() => {
    setNameOfTodo(details?.todoName || "");
  }, [details]);

  const handleChange = (e) => {
    setNameOfTodo(e.target.value);
  };

  const handleUpdate = async () => {
    const updatedDetails = { name: nameOfTodo, id: details?._id };
    const response = await todoUpdation(updatedDetails);
    if (response?.message) {
      alert(response?.message);
      onClose();
      update();
    }
  };

  return (
    <div className="fixed bg-[#0000002f] top-0 left-0 w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl w-1/2 p-6">
        <div className="flex flex-col">
          <label className="text-black font-semibold text-[1rem] mb-2">
            Todo Name
          </label>
          <input
            value={nameOfTodo}
            onChange={handleChange}
            className="border-2 border-color-3 rounded-xl bg-color-1 p-2 text-color-2 placeholder:text-color-2 outline-none"
            type="text"
            placeholder="Enter your todo name"
          />
        </div>
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={onClose}
            className="bg-color-5 rounded-lg p-2 w-fit text-color-1 font-normal"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-600 rounded-lg p-2 w-fit text-color-1 font-normal"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
