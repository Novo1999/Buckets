import Toaster from './Components/Toaster'
import Home from './Pages/Home'
import { AiFillHeart } from 'react-icons/ai'

function App() {
  return (
    <>
      <Toaster />
      <div className='bg-gradient-to-t from-gray-700 via-gray-900 to-black overflow-hidden h-screen'>
        <Home />
        <div className='h-fit flex text-white justify-center items-center gap-2 relative lg:bottom-[1px] xl:bottom-4 bottom-4 font-thin text-md'>
          Made with <AiFillHeart /> by Novo
        </div>
      </div>
    </>
  )
}

export default App
