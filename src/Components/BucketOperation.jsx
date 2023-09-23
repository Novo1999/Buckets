import { AiOutlineSave } from 'react-icons/ai'

import { setTabIsOpen } from '../features/bucketSlice/bucketSlice'
import Modal from './Modal'

import { useDispatch, useSelector } from 'react-redux'
import { IoCreateOutline } from 'react-icons/io5'
import AllBuckets from './AllBuckets'
import Header from './Header'
import Button from './Button'
import { useSubmitContent } from '../hooks/useSubmit'
import { useGetBucket } from '../hooks/useGetBucket'
import { LoaderIcon } from 'react-hot-toast'

function BucketOperation() {
  const dispatch = useDispatch()
  const { handleSubmit } = useSubmitContent()
  const {
    text,
    tabIsOpen,
    isDeleting: isDeletingBucket,
  } = useSelector(state => state.bucket)

  const { isLoading } = useGetBucket()

  function showTitle() {
    if (text.length > 0)
      return text.length > 10 ? `${text.slice(0, 10)}...` : text.slice(0, 10)
    return (
      <span className='flex items-center font-semibold'>
        <IoCreateOutline />
        {tabIsOpen ? 'Create New' : 'Untitled'}
      </span>
    )
  }

  return (
    <section className='shadow-md lg:overflow-auto bucket-section pt-2 pr-2'>
      {isDeletingBucket && <Modal onPage='home' />}
      <div className='flex p-4 flex-col  sm:flex-row h-52 overflow-x-auto lg:overflow-x-auto lg:h-40 xl:max-h-52 xl:overflow-auto'>
        <div className='flex sm:items-center justify-evenly'>
          <Header type='home' />
          <div className='h-fit justify-between sm:ml-4 w-36 grid gap-2 sm:mr-10 col-span-2 rounded-md text-center '>
            <Button to='bucket-list' type='link'>
              Show All
            </Button>
            <div className='flex flex-col gap-4 w-fit'>
              <Button
                to='/'
                onClick={() => dispatch(setTabIsOpen(false))}
                type='link'
              >
                {showTitle()}
              </Button>
              {text && (
                <button
                  className='h-4 w-36 flex justify-center items-center gap-2 text-lg font-normal transition-all duration-300 border-2 rounded-lg p-4 text-white hover:bg-white hover:text-black'
                  type='submit'
                  onClick={e => handleSubmit(e)}
                >
                  <AiOutlineSave />
                  Save
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='ml-1 mr-10'>
          {isLoading ? (
            <span className='text-3xl flex items-baseline gap-2 text-white'>
              Loading
              <LoaderIcon />
            </span>
          ) : (
            <div className='grid gap-y-4 gap-20 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8'>
              <AllBuckets />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BucketOperation
