import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

function Button({ updateFn, type, children, to, onClick }) {
  const { isEditing, currentContentId, editedContent } = useSelector(
    (state) => state.bucket
  );

  if (type === "link") {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="relative text-white top-2 border-2 drop-shadow-lg shadow-xl px-2 py-2 rounded-md "
      >
        {children}
      </Link>
    );
  }
  return (
    isEditing && (
      <div className="bg-black text-white px-4 py-2 rounded-xl absolute top-7 right-7 cursor-pointer ">
        <button
          onClick={() => updateFn(currentContentId, editedContent)}
          value="Update"
          className="flex items-center gap-2"
        >
          <MdOutlineSystemUpdateAlt />
          <span className="hidden md:block">Update</span>
        </button>
      </div>
    )
  );
}

export default Button;
