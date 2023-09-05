import { HiPlus } from "react-icons/hi2";
import { useCreateBucket } from "../hooks/useCreateBucket";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function AddBucket() {
  const [tabIsOpen, setTabisOpen] = useState(false);

  const { title, text } = useSelector((state) => state.bucket);
  const { mutate } = useCreateBucket();

  function showTitle() {
    if (title.length > 0 || text.length > 0)
      return title.slice(0, 20) || text.slice(0, 20);
    return "Untitled";
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ title: title, content: text });
  }
  return (
    <div className="shadow-md pb-8 grid grid-rows-1 grid-cols-10 gap-10 justify-center items-center pt-5 h-24">
      <button className="shadow-lg p-4 h-15 rounded-lg ml-16 hover:bg-black hover:text-white transition-all duration-200 font-bold text-2xl col-span-1 w-14">
        <HiPlus />
      </button>
      <div className="shadow-md h-15 p-4 w-60 flex justify-between items-center px-2 col-span-2">
        {showTitle()}
        <button>
          <RxCross2 />
        </button>
      </div>
      <button
        className="mr-20 h-15 bg-white shadow-md px-4 py-4 w-18 rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Save
      </button>
    </div>
  );
}

export default AddBucket;
