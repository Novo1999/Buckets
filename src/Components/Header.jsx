import { BsBucketFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Header({ type }) {
  const navigate = useNavigate()
  if (type === 'list')
    return (
      <div className='text-2xl sm:text-5xl font-serif mb-12 relative top-4 right-10 text-white'>
        <div
          className='flex justify-start items-baseline cursor-pointer '
          onClick={() => navigate('/')}
        >
          <BsBucketFill />
          <p className='text-xs font-sans'>That hold</p>
        </div>
        Buckets
      </div>
    )
  return (
    <div className='text-2xl sm:text-5xl font-serif mb-10 relative text-white '>
      <div
        className='flex justify-start items-baseline cursor-pointer'
        onClick={() => navigate('/')}
      >
        <BsBucketFill />
        <p className='text-xs font-sans'>That hold</p>
      </div>
      Buckets
    </div>
  )
}

export default Header
