import { useDispatch } from "react-redux";

import { updateContent, useUpdateBucket } from "../hooks/useUpdateBucket";
import Button from "./Button";

function Input({ value, dispatchFn, type }) {
  const dispatch = useDispatch();
  const { updateBucket } = useUpdateBucket();

  // Changes the text area
  function handleChange(e) {
    dispatch(dispatchFn(e.target.value));
  }

  function handleUpdate(e, id, content) {
    if (e.target.value === "Update") {
      updateContent(id, content);
      updateBucket();
    }
  }

  return (
    <div className="relative p-4 flex justify-center max-w-[120rem]">
      {type === "editContent" && <Button updateFn={handleUpdate} />}
      <textarea
        value={value}
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="Text"
        className={`border-4 rounded-lg focus:outline-red-300 w-full h-[40rem] px-2 resize-none overflow-y-auto pt-[6px]`}
      ></textarea>
    </div>
  );
}

export default Input;
