/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCurrentContent,
  setIsDeleting,
  setTabIsOpen,
} from "../features/bucketSlice/bucketSlice";

import { formatDate } from "../helper";
import useWindowDimensions from "../hooks/useWindowDimensions";

function BucketLink({ item, onPage, route }) {
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  function handleClick(id) {
    dispatch(setCurrentContent(id));
    dispatch(setTabIsOpen(true));
  }

  function setContentLength() {
    if (
      (item.content.length > 300 && width < 767) ||
      (item.content.length > 300 && width > 1280)
    ) {
      return `${item?.content.slice(0, 300)}...`;
    }
    if (width > 767) {
      return `${item?.content.slice(0, 100)}...`;
    }
    return item.content;
  }

  if (onPage === "list") {
    return (
      <Link
        key={item.id}
        to={`/bucket/${item.id}`}
        onClickCapture={() => handleClick(item.id)}
        className={`shadow-md p-2 gap-x-4 w-96 h-fit lg:w-56 sm:w-80 md:h-fit md:w-52 mb-10 xl:w-80 relative flex px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:border-2 rounded-md mx-auto`}
        style={{ backgroundColor: item.color }}
      >
        <div className="flex flex-col transition-all duration-500 gap-2 sm:gap-4">
          <p className="text-sm sm:text-md lg:text-base">ID: {item.id}</p>
          <p className=" font-thin text-sm lg:text-base">
            Created: {formatDate(item.created_at)}
          </p>
          <p className="drop-shadow-lg font-normal break-all text-sm lg:text-base">
            {setContentLength()}
          </p>
        </div>
        <button
          className="hover:scale-125 text-white transition-all absolute top-4 right-2 duration-300 cross text-xl md:text-2xl"
          onClick={() => dispatch(setIsDeleting(true))}
        >
          <MdDeleteForever />
        </button>
      </Link>
    );
  }

  return (
    <Link
      key={item.id}
      to={`/bucket/${item.id}`}
      onClickCapture={() => handleClick(item.id)}
      className={`shadow-md p-2 w-fit gap-x-4 h-fit mr-8 flex justify-between items-center px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:border-2 rounded-md ${
        Number(route) === item.id && "border-2"
      }`}
      style={{ backgroundColor: item.color }}
    >
      <div className="flex flex-col transition-all duration-500">
        {Number(route) === item.id ? (
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
}

export default BucketLink;
