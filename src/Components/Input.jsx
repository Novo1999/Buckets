import { useDispatch } from "react-redux";

function Input({ value, dispatchFn, type, children }) {
  const dispatch = useDispatch();

  let style = {};
  if (type === "title") {
    style = {
      height: "h-[3rem]",
    };
  }
  if (type === "textContent") {
    style = {
      height: "h-[40rem]",
    };
  }
  return (
    <textarea
      value={value}
      onChange={(e) => dispatch(dispatchFn(e.target.value))}
      type="text"
      placeholder={type === "title" ? "Title" : "Text"}
      className={`border-4 rounded-lg focus:outline-red-300 w-[110rem] ${style.height} px-2 resize-none mt-4 overflow-y-auto pt-[6px]`}
    >
      {children}
    </textarea>
  );
}

export default Input;
