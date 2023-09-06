import { useDispatch, useSelector } from "react-redux";
import { setIsEditing } from "../features/bucketSlice/bucketSlice";

function Button({ updateFn }) {
  const dispatch = useDispatch();
  const { isEditing, currentContentId, editedContent } = useSelector(
    (state) => state.bucket
  );
  return (
    <button
      value={isEditing ? "Update" : "Edit"}
      className="bg-black text-white px-4 py-2 rounded-xl absolute top-7 right-7"
      onClick={(e) => {
        dispatch(setIsEditing(!isEditing));
        updateFn(e, currentContentId, editedContent);
      }}
    >
      {isEditing ? "Update" : "Edit"}
    </button>
  );
}

export default Button;
