import { LoaderIcon } from "react-hot-toast";
import { useGetBucket } from "../hooks/useGetBucket";
import Input from "../Components/Input";
import { useSelector } from "react-redux";

function Bucket() {
  const { currentContent: currentId } = useSelector((state) => state.bucket);
  const { data, isLoading } = useGetBucket();

  const clickedItem = data?.find((item) => item.id === currentId)?.content;

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <Input
          type="textContent"
          className="border-2 border-black"
          name="content"
          id="content"
          value={clickedItem}
        ></Input>
      )}
    </div>
  );
}

export default Bucket;
