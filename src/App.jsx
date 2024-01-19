import Toaster from './Components/Toaster'
import Home from './Pages/Home'
import { AiFillHeart } from 'react-icons/ai'

function App() {
  return (
    <>
      <Toaster />
      <div className='bg-gradient-to-t from-gray-700 via-gray-900 to-black min-h-screen'>
        <Home />
        <div className='h-fit flex text-white justify-center items-center gap-2 relative lg:top-[7.7rem] xl:top-[-1rem] bottom-4 mt-10 font-thin text-md'>
          Made with <AiFillHeart /> by Novo
        </div>
      </div>
    </>
  )
}

export default App
