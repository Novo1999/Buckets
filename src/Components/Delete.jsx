import { BsQuestionCircleFill } from "react-icons/bs";
import { deleteContent, useDeleteBucket } from "../hooks/useDeleteBucket";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleting,
  setTabIsOpen,
} from "../features/bucketSlice/bucketSlice";
import { useState } from "react";
import { useGetKey } from "../hooks/useGetKey";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Delete({ onPage }) {
  const [userYes, setUserYes] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { mutate: deleteBucketFromApi } = useDeleteBucket();
  const { currentContentId } = useSelector((state) => state.bucket);
  const { data: key } = useGetKey();

  const navigate = useNavigate();

  function handleYes() {
    setUserYes(true);
  }

  function handleDelete(id) {
    deleteContent(id);
    dispatch(setTabIsOpen(false));
    dispatch(setIsDeleting(false));
    deleteBucketFromApi();
    if (onPage === "home") navigate("/");
    if (onPage === "list") navigate("/bucket-list");
  }

  return (
    <div className="bg-slate-700 fixed z-10 h-screen w-screen flex justify-center items-center bg-opacity-50 top-0 left-0">
      <div className="w-72 relative z-50 h-48 bg-white rounded-xl flex justify-start items-center p-6 flex-col gap-6 shadow-lg ">
        <p className="text-center font-semibold text-md mt-3 font-sans flex ">
          {userYes
            ? "Enter Password 🔐"
            : "Are you sure you want to delete this Bucket"}
          {!userYes ? (
            <span className="relative top-7 right-10 text-lg ">
              <BsQuestionCircleFill />
            </span>
          ) : (
            ""
          )}
        </p>
        <div className="flex gap-4 ">
          {!userYes ? (
            <>
              <button
                value="yes"
                className="rounded-lg bg-green-500 px-4 py-2 font-semibold hover:scale-110 transition-all duration-300 "
                onClick={handleYes}
              >
                Yes
              </button>
              <button
                onClick={() => dispatch(setIsDeleting(false))}
                value="no"
                className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:scale-110 duration-300 "
              >
                No
              </button>
            </>
          ) : (
            <div className="">
              <form>
                <input
                  autoFocus
                  className="pl-3 bg-red-500 ml-4 h-10 w-44 relative bottom-4 rounded-lg placeholder:text-black font-semibold text-white"
                  type="password"
                  placeholder="Password..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex gap-10 mt-2 justify-center ">
                  <input
                    type="submit"
                    value="Confirm"
                    className="rounded-lg bg-green-500 px-4 py-2 cursor-pointer font-semibold hover:scale-110 transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      if (input !== key[0]?.key) {
                        toast.error("Wrong Password.Try Again", {
                          duration: 1000,
                        });
                        setInput("");
                      }
                      if (input === key[0]?.key) {
                        handleDelete(currentContentId);
                      }
                    }}
                  />
                  <button
                    onClick={() => dispatch(setIsDeleting(false))}
                    className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:scale-110 duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Delete;
