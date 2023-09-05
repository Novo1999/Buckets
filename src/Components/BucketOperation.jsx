import { HiPlus } from "react-icons/hi2";
import { useCreateBucket } from "../hooks/useCreateBucket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useGetBucket } from "../hooks/useGetBucket";
import { useDeleteBucket } from "../hooks/useDeleteBucket";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import { setCurrentContent } from "../features/bucketSlice/bucketSlice";
// import { useRandomColor } from "../hooks/useRandomColor";

function BucketOperation() {
  // State
  const [tabIsOpen, setTabisOpen] = useState(false);
  const { title, text } = useSelector((state) => state.bucket);
  const dispatch = useDispatch();

  // Query
  const { mutate: createBucket } = useCreateBucket();
  const { data } = useGetBucket();
  const { deleteContent, mutate: deleteBucket, isDeleting } = useDeleteBucket();

  function showTitle() {
    if (title.length > 0 || text.length > 0)
      return title.slice(0, 20) || text.slice(0, 20);
    return "Untitled";
  }

  console.log(data);

  function handleSubmit(e) {
    if (!text) return;
    e.preventDefault();
    if (!title) {
      return createBucket({ title: text.slice(0, 20), content: text });
    }

    return createBucket({ title: title, content: text });
  }

  function handleDelete(id) {
    deleteContent(id);
    deleteBucket();
  }

  function handleClick(id) {
    dispatch(setCurrentContent(id));
  }

  return (
    <section className="shadow-md w-screen">
      <div className="pb-8 grid grid-rows-1 grid-cols-10 pt-5 gap-y-10 pl-20">
        <button className="shadow-lg p-4 h-15 rounded-lg hover:bg-black hover:text-white transition-all duration-200 font-bold text-2xl col-span-1 w-14">
          <HiPlus />
        </button>
        <div className="shadow-md h-15 p-4 w-60 flex justify-between items-center px-2 col-span-2">
          {showTitle()}
          <button className="hover:scale-125">
            <RxCross2 />
          </button>
        </div>
        {data?.map((item) => {
          return (
            <Link
              to={`bucket/${item.id}`}
              onClick={() => handleClick(item.id)}
              key={item.id}
              className="shadow-md h-15 p-4 w-60 flex justify-between items-center px-2 col-span-2 cursor-pointer"
              style={{ backgroundColor: item.color }}
            >
              {item.title}
              {isDeleting ? (
                <LoaderIcon />
              ) : (
                <button
                  className="hover:scale-125"
                  onClick={() => handleDelete(item.id)}
                >
                  <RxCross2 />
                </button>
              )}
            </Link>
          );
        })}

        <button
          className="mr-20 h-15 bg-white shadow-md px-4 py-4 w-18 rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default BucketOperation;
