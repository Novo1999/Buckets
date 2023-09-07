import { useCreateBucket } from "../hooks/useCreateBucket";
import { useDispatch, useSelector } from "react-redux";
import { BsBucketFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { useGetBucket } from "../hooks/useGetBucket";
import { useDeleteBucket } from "../hooks/useDeleteBucket";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  setCurrentContent,
  setIsDeleting,
  setTabIsOpen,
  textContent,
} from "../features/bucketSlice/bucketSlice";
import Modal from "./Modal";

function BucketOperation() {
  // State
  const {
    text,
    currentContentId,
    isDeleting: isDeletingBucket,
    tabIsOpen,
  } = useSelector((state) => state.bucket);
  const dispatch = useDispatch();

  // Query
  const { mutate: createBucket } = useCreateBucket();
  const { data } = useGetBucket();
  const { isDeleting } = useDeleteBucket();

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
  function handleClick(id) {
    dispatch(setCurrentContent(id));
    dispatch(setTabIsOpen(true));
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
              className="relative text-white top-4 border-2 border-blue-900 shadow-xl px-2 py-2 rounded-md"
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
            {data?.map((item) => {
              return (
                <Link
                  to={`bucket/${item.id}`}
                  onClickCapture={() => handleClick(item.id)}
                  key={item.id}
                  className={`shadow-md  p-4 max-w-xl w-fit h-fit mr-8 flex justify-between items-center px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:border-2 rounded-md ${
                    currentContentId === item.id && "border-2"
                  } `}
                  style={{ backgroundColor: item.color }}
                >
                  <span className="drop-shadow-lg">
                    {item.content.length > 5
                      ? `${item.content.slice(0, 5)}...`
                      : item.content}
                  </span>
                  {isDeleting && currentContentId === item.id ? (
                    <LoaderIcon />
                  ) : (
                    <button
                      className="hover:scale-125 text-white transition-all duration-300 cross"
                      onClick={() => dispatch(setIsDeleting(true))}
                    >
                      <MdDeleteForever />
                    </button>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BucketOperation;
