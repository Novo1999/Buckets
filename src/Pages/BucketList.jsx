import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button";
import Header from "../Components/Header";
import { formatDate } from "../helper";
import { useGetBucket } from "../hooks/useGetBucket";
import { Link } from "react-router-dom";
import {
  setCurrentContent,
  setIsDeleting,
  setTabIsOpen,
} from "../features/bucketSlice/bucketSlice";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../Components/Modal";

function BucketList() {
  const { data } = useGetBucket();
  const { currentContentId, isDeleting: isDeletingBucket } = useSelector(
    (state) => state.bucket
  );
  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(setCurrentContent(id));
    dispatch(setTabIsOpen(true));
  }

  return (
    <section className="bg-blue-400 max-w-screen w-full h-full p-4">
      {isDeletingBucket && <Modal onPage="list" />}
      <div className="flex justify-start gap-10 items-center ml-14">
        <Header />
        <Button type="link" to="/">
          Home
        </Button>
      </div>
      <div className="grid grid-cols-4 ">
        {data?.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/bucket/${item.id}`}
              onClickCapture={() => handleClick(item.id)}
              className={`shadow-md p-2 gap-x-4 w-96 h-96 mr-8 mb-10 relative flex px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:border-2 rounded-md m-auto ${
                currentContentId === item.id && "border-2"
              } `}
              style={{ backgroundColor: item.color }}
            >
              <div className="flex flex-col transition-all duration-500 gap-10">
                <p className="text-md font-thin ">
                  Created: {formatDate(item.created_at)}
                </p>
                <p className="drop-shadow-lg font-normal">
                  {item.content.length > 400
                    ? `${item.content.slice(0, 400)}...`
                    : item.content}
                </p>
              </div>
              <button
                className="hover:scale-125 text-white transition-all text-3xl absolute top-4 right-2 duration-300 cross redirect-guard"
                onClick={() => dispatch(setIsDeleting(true))}
              >
                <MdDeleteForever />
              </button>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BucketList;
