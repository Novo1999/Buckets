import Toaster from "./Components/Toaster";
import Home from "./Pages/Home";
import { AiFillHeart } from "react-icons/ai";

function App() {
  return (
    <>
      <Toaster />
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 overflow-x-hidden h-screen">
        <Home />
        <div className="flex text-white justify-center items-center gap-2 relative lg:bottom-[1px] xl:bottom-4 bottom-4 font-thin text-md">
          Made with <AiFillHeart /> by Novo
        </div>
      </div>
    </>
  );
}

export default App;
