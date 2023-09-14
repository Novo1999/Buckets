import { useDispatch } from "react-redux";

import { updateContent, useUpdateBucket } from "../hooks/useUpdateBucket";
import Button from "./Button";
import {
  setIsEditing,
  setIsFocused,
} from "../features/bucketSlice/bucketSlice";

function Input({ value, dispatchFn, type }) {
  const dispatch = useDispatch();
  const { updateBucket } = useUpdateBucket();

  // Changes the text area
  function handleChange(e) {
    dispatch(dispatchFn(e.target.value));
  }

  function handleUpdate(id, content) {
    updateContent(id, content);
    updateBucket();
    dispatch(setIsEditing(false));
  }

  return (
    <div className="relative p-4 flex justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 h-full lg:h-[36rem] xl:h-full">
      {type === "editContent" && <Button updateFn={handleUpdate} />}
      <textarea
        autoFocus={type === "write"}
        value={value}
        onBlur={() => setIsFocused(false)}
        onFocus={() => {
          setIsFocused(true);
          type === "editContent" && dispatch(setIsEditing(true));
        }}
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="Text..."
        className="border-2 focus:border-4 rounded-lg transition-all duration-100 ease-in border-white focus:outline-none w-full h-[32rem]
        lg:h-[35rem] px-2 resize-none overflow-y-auto pt-[6px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-blue-800 to-gray-900 placeholder:text-white text-white 2xl:h-[45rem] pr-28 font-semibold text-lg"
      ></textarea>
    </div>
  );
}

export default Input;
