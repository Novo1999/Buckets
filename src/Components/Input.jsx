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
    <div className="relative p-4 flex justify-center bg-green-400 h-full lg:h-[36rem] xl:h-full">
      {type === "editContent" && <Button updateFn={handleUpdate} />}
      <textarea
        value={value}
        onBlur={() => setIsFocused(false)}
        onFocus={() => {
          setIsFocused(true);
          type === "editContent" && dispatch(setIsEditing(true));
        }}
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="Text..."
        className="border-2 focus:border-4 rounded-lg transition-all duration-100 ease-in border-black focus:outline-none w-full h-[32rem]
        lg:h-[38rem] px-2 resize-none overflow-y-auto pt-[6px] bg-emerald-200 placeholder:text-black 2xl:h-[45rem] pr-28"
      ></textarea>
    </div>
  );
}

export default Input;
