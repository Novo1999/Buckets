import { useDispatch, useSelector } from "react-redux";

import { useGetBucket } from "../hooks/useGetBucket";

import {
  setCurrentContent,
  setIsDeleting,
  setTabIsOpen,
} from "../features/bucketSlice/bucketSlice";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../helper";
import { MdDeleteForever } from "react-icons/md";

function AllBuckets() {
  const { data } = useGetBucket();
  const { id: route } = useParams();

  const { currentContentId } = useSelector((state) => state.bucket);
  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(setCurrentContent(id));
    dispatch(setTabIsOpen(true));
  }

  return data?.map((item) => {
    return (
      <Link
        key={item.id}
        to={`/bucket/${item.id}`}
        onClickCapture={() => handleClick(item.id)}
        className={`shadow-md p-2 w-fit gap-x-4 h-fit mr-8 flex justify-between items-center px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:border-2 rounded-md ${
          +route === item.id && "border-2"
        }`}
        style={{ backgroundColor: item.color }}
      >
        <div className="flex flex-col transition-all duration-500">
          {+route === item.id ? (
            <span className="text-xs font-thin">
              Created at : {formatDate(item.created_at)}
            </span>
          ) : (
            ""
          )}
          <span className="drop-shadow-lg">
            {item.content.length > 7
              ? `${item.content.slice(0, 7)}...`
              : item.content}
          </span>
        </div>
        <button
          className="hover:scale-125 text-white transition-all duration-300 cross"
          onClick={() => dispatch(setIsDeleting(true))}
        >
          <MdDeleteForever />
        </button>
      </Link>
    );
  });
}

export default AllBuckets;
