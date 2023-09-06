import { useCreateBucket } from "../hooks/useCreateBucket";
import { useDispatch, useSelector } from "react-redux";
import { BsBucketFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineSave } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
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
    return (
      <span className="flex items-center">
        <IoCreateOutline />
        Create New
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

  function handleDelete(id) {
    deleteContent(id);
    deleteBucket();
    dispatch(setTabIsOpen(false));
  }

  return (
    <section className="shadow-md">
      <div className="flex p-4 gap-x-8">
        <div className="text-5xl font-serif">
          <span className="text-5xl">
            <BsBucketFill />
          </span>
          Buckets
        </div>
        <div className="grid gap-y-20 gap-x-28 grid-cols-12">
          <div className="shadow-md h-30 w-48 flex flex-col gap-6 items-center col-span-2">
            <Link
              className="relative top-4 border-2 px-2 py-2"
              onClick={setTabIsOpen(false)}
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
          <div className="grid grid-cols-6 gap-y-4 gap-x-52">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default BucketOperation;
