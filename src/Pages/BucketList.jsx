import { useSelector } from 'react-redux'
import Button from '../Components/Button'
import Header from '../Components/Header'

import { useGetBucket } from '../hooks/useGetBucket'

import Modal from '../Components/Modal'
import BucketLink from '../Components/BucketLink'
import { Toaster } from 'react-hot-toast'

function BucketList() {
  const { isDeleting: isDeletingBucket } = useSelector(state => state.bucket)
  const { data } = useGetBucket()
  return (
    <section className='bg-gradient-to-t from-gray-700 via-gray-900 to-black min-h-screen w-full p-4'>
      <Toaster />
      {isDeletingBucket && <Modal onPage='list' />}
      <div className='flex justify-between pl-14 pr-10 items-center'>
        <Header type='list' />
        <Button type='link' to='/'>
          Home
        </Button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3'>
        {data?.map(item => {
          return <BucketLink onPage='list' key={item.id} item={item} />
        })}
      </div>
    </section>
  )
}

export default BucketList
