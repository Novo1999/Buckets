import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useState } from "react";

function Button({ updateFn }) {
  const { isEditing, currentContentId, editedContent } = useSelector(
    (state) => state.bucket
  );
  return (
    isEditing && (
      <div className="bg-black text-white px-4 py-2 rounded-xl absolute top-7 right-7 cursor-pointer">
        <button
          onClick={() => updateFn(currentContentId, editedContent)}
          value="Update"
          className="flex items-center gap-2"
        >
          <MdOutlineSystemUpdateAlt /> Update
        </button>
      </div>
    )
  );
}

export default Button;
