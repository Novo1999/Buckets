import { useDispatch, useSelector } from "react-redux";
import { useCreateBucket } from "./useCreateBucket";
import { textContent } from "../features/bucketSlice/bucketSlice";

export function useSubmitContent() {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.bucket);
  const { mutate: createBucket } = useCreateBucket();

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    dispatch(textContent(""));
    createBucket({ content: text });
  }

  return { handleSubmit };
}
