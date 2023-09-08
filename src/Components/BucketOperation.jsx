import { BsBucketFill } from "react-icons/bs";

import { AiOutlineSave } from "react-icons/ai";

import { Link } from "react-router-dom";
import { setTabIsOpen, textContent } from "../features/bucketSlice/bucketSlice";
import Modal from "./Modal";

import { useDispatch, useSelector } from "react-redux";
import { IoCreateOutline } from "react-icons/io5";
import { useCreateBucket } from "../hooks/useCreateBucket";
import SpecificBucket from "./SpecificBucket";

function BucketOperation() {
  const { mutate: createBucket } = useCreateBucket();
  const dispatch = useDispatch();
  const {
    text,
    tabIsOpen,
    isDeleting: isDeletingBucket,
  } = useSelector((state) => state.bucket);

  function showTitle() {
    if (text.length > 0)
      return text.length > 10 ? `${text.slice(0, 10)}...` : text.slice(0, 10);
    return (
      <span className="flex items-center font-semibold">
        <IoCreateOutline />
        {tabIsOpen ? "Create New" : "Untitled"}
      </span>
    );
  }

  function handleSubmit(e) {
    if (!text) return;
    e.preventDefault();
    dispatch(textContent(""));
    return createBucket({ content: text });
  }

  return (
    <section className="shadow-md bg-gradient-to-r from-indigo-500 max-w-full from-10% via-sky-500 via-30% to-emerald-500 to-90% lg:overflow-auto bucket-section pb-2">
      {isDeletingBucket && <Modal />}

      <div className="flex p-4 flex-col sm:flex-row h-48 overflow-x-auto lg:overflow-x-auto lg:h-40 xl:max-h-52 xl:overflow-auto ">
        <div className="flex sm:items-center justify-evenly ml-2">
          <span className="text-4xl sm:text-5xl font-serif mb-8">
            <BsBucketFill />
            Buckets
          </span>

          <div className="h-30 w-48 flex flex-col gap-6 items-center col-span-2 rounded-md">
            <Link
              className="relative text-white top-4 border-2 drop-shadow-lg shadow-xl px-2 py-2 rounded-md "
              onClick={() => dispatch(setTabIsOpen(false))}
              to="/"
            >
              {showTitle()}
            </Link>
            {text && (
              <button
                className="h-4 w-36 flex justify-center items-center gap-2 hover:underline rounded-md text-lg font-semibold  transition-all duration-300"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                <AiOutlineSave />
                Save
              </button>
            )}
          </div>
        </div>

        <div className="ml-8">
          <div className="grid gap-y-4 gap-20 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8">
            <SpecificBucket />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BucketOperation;
