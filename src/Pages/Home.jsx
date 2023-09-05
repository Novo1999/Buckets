import { useCreateBucket } from "../hooks/useCreateBucket";
import Toaster from "../Components/Toaster";

import { useDispatch, useSelector } from "react-redux";
import {
  textContent,
  title as changeTitle,
} from "../features/bucketSlice/bucketSlice";
import AddBucket from "../Components/AddBucket";
import Input from "../Components/Input";

function Home() {
  const { title, text } = useSelector((state) => state.bucket);

  return (
    <section>
      <AddBucket />
      <Toaster />
      <div className="flex justify-center h-screen ">
        <form className="flex items-center flex-col gap-4 h-screen mt-10">
          <Input value={title} dispatchFn={changeTitle} type="title" />
          <Input value={text} dispatchFn={textContent} type="textContent" />
        </form>
      </div>
    </section>
  );
}

export default Home;

// 2 Input fields
// One for title
// One for text
