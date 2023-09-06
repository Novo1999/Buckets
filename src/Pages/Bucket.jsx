import { useGetBucket } from "../hooks/useGetBucket";
import Input from "../Components/Input";
import { useDispatch, useSelector } from "react-redux";
import { setEditedContent } from "../features/bucketSlice/bucketSlice";
import { useEffect } from "react";

function Bucket() {
  const { currentContentId, isEditing, editedContent } = useSelector(
    (state) => state.bucket
  );

  const dispatch = useDispatch();

  const { data } = useGetBucket();

  // Get a single content from the query cache
  const clickedItemContent = data?.find(
    (item) => item.id === currentContentId
  )?.content;

  // To do the editing on the currently saved content
  useEffect(() => {
    dispatch(setEditedContent(clickedItemContent));
  }, [clickedItemContent, dispatch]);

  return (
    <div className="flex flex-col justify-center">
      <Input
        type="editContent"
        className="border-2 border-black"
        name="content"
        id="content"
        value={isEditing ? editedContent : clickedItemContent}
        dispatchFn={setEditedContent}
      ></Input>
    </div>
  );
}

export default Bucket;
