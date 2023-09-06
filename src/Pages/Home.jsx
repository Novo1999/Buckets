import { useCreateBucket } from "../hooks/useCreateBucket";
import Toaster from "../Components/Toaster";

import { useDispatch, useSelector } from "react-redux";
import { textContent } from "../features/bucketSlice/bucketSlice";

import Input from "../Components/Input";

import BucketOperation from "../Components/BucketOperation";
import { Outlet } from "react-router-dom";
import Bucket from "./Bucket";

function Home() {
  const { text, tabIsOpen } = useSelector((state) => state.bucket);

  return (
    <section>
      <BucketOperation />
      <Toaster />
      <div className="flex flex-col justify-center">
        {!tabIsOpen ? (
          <div className="flex flex-col">
            <Input value={text} dispatchFn={textContent} />
          </div>
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
