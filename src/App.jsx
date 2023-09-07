import Home from "./Pages/Home";
import { AiFillHeart } from "react-icons/ai";

function App() {
  return (
    <>
      <div className="bg-green-400 overflow-x-hidden h-screen">
        <Home />
        <div className="flex justify-center items-center gap-2 relative bottom-2 lg:bottom-[1px] xl:bottom-4 font-thin text-md">
          Made with <AiFillHeart /> by Novo
        </div>
      </div>
    </>
  );
}

export default App;
