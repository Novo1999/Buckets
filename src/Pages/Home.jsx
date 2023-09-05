import { useCreateBucket } from "../hooks/useCreateBucket";
import Toaster from "../Components/Toaster";

import { useDispatch, useSelector } from "react-redux";
import {
  textContent,
  title as changeTitle,
} from "../features/bucketSlice/bucketSlice";

import Input from "../Components/Input";

import BucketOperation from "../Components/BucketOperation";
import { Outlet } from "react-router-dom";
import Bucket from "./Bucket";

function Home() {
  const { title, text, tabIsOpen } = useSelector((state) => state.bucket);

  return (
    <section>
      <BucketOperation />
      <Toaster />
      <div className="flex justify-center h-screen ">
        {!tabIsOpen ? (
          <form className="flex items-center flex-col gap-4 h-screen mt-10">
            <Input value={title} dispatchFn={changeTitle} type="title" />
            <Input value={text} dispatchFn={textContent} type="textContent" />
          </form>
        ) : (
          <Outlet />
        )}
      </div>
    </section>
  );
}

export default Home;

// 2 Input fields
// One for title
// One for text
