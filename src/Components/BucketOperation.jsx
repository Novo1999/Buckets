import { useCreateBucket } from "../hooks/useCreateBucket";
import { useDispatch, useSelector } from "react-redux";

import { RxCross2 } from "react-icons/rx";
import { useGetBucket } from "../hooks/useGetBucket";
import { deleteContent, useDeleteBucket } from "../hooks/useDeleteBucket";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  setCurrentContent,
  setTabIsOpen,
  textContent,
} from "../features/bucketSlice/bucketSlice";

function BucketOperation() {
  // State
  const { text, currentContentId } = useSelector((state) => state.bucket);
  const dispatch = useDispatch();

  // Query
  const { mutate: createBucket } = useCreateBucket();
  const { data } = useGetBucket();
  const { mutate: deleteBucket, isDeleting } = useDeleteBucket();

  function showTitle() {
    if (text.length > 0)
      return text.length > 15 ? `${text.slice(0, 15)}...` : text.slice(0, 15);
    return "Untitled";
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

  function handleDelete(id) {
    deleteContent(id);
    deleteBucket();
    dispatch(setTabIsOpen(false));
  }

  return (
    <section className="shadow-md w-screen">
      <div className="pb-8 grid pt-5 pl-20 h-auto grid-rows-1 grid-cols-2">
        <div className="grid gap-y-20 grid-cols-12">
          <Link
            onClick={setTabIsOpen(false)}
            to="/"
            className="shadow-md h-20 w-48 flex justify-between items-center px-2 col-span-2"
          >
            {showTitle()}
            <button className="hover:scale-125">
              <RxCross2 />
            </button>
          </Link>
          <div className="grid grid-cols-7 gap-y-4 gap-x-52 ml-16">
            {data?.map((item) => {
              return (
                <Link
                  to={`bucket/${item.id}`}
                  onClickCapture={() => handleClick(item.id)}
                  key={item.id}
                  className="shadow-md h-10 p-4 w-48 flex justify-between items-center px-2 drop-shadow-md col-span-1 text-white cursor-pointer font-semibold text-lg hover:text-black "
                  style={{ backgroundColor: item.color }}
                >
                  <span className="drop-shadow-lg">
                    {item.content.length > 12
                      ? `${item.content.slice(0, 12)}...`
                      : item.content}
                  </span>
                  {isDeleting && currentContentId === item.id ? (
                    <LoaderIcon />
                  ) : (
                    <button
                      className="hover:scale-125 transition-all duration-300 cross"
                      onClick={() => handleDelete(item.id)}
                    >
                      <RxCross2 />
                    </button>
                  )}
                </Link>
              );
            })}
            <button
              className="mr-20 h-10 w-36 flex justify-center items-center bg-white shadow-md px-4 py-4 w-18 rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BucketOperation;
