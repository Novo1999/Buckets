import { useSelector } from "react-redux";
import Delete from "./Delete";

function Modal({ onPage }) {
  const { isDeleting } = useSelector((state) => state.bucket);
  return isDeleting && <Delete onPage={onPage} />;
}

export default Modal;
