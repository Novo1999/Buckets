import { useSelector } from "react-redux";
import Delete from "./Delete";

function Modal() {
  const { isDeleting } = useSelector((state) => state.bucket);
  return isDeleting && <Delete />;
}

export default Modal;
