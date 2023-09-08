import { BsBucketFill } from "react-icons/bs";

function Header() {
  return (
    <span className="text-4xl sm:text-5xl font-serif mb-8">
      <div className="flex justify-start items-baseline">
        <BsBucketFill />
        <p className="text-xs font-sans">That hold</p>
      </div>
      Buckets
    </span>
  );
}

export default Header;
