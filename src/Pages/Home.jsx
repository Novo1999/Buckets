import { useDispatch, useSelector } from 'react-redux'
import { setTabIsOpen, textContent } from '../features/bucketSlice/bucketSlice'

import Input from '../Components/Input'

import BucketOperation from '../Components/BucketOperation'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const { text, tabIsOpen } = useSelector((state) => state.bucket)
  const dispatch = useDispatch((state) => state.bucket)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') dispatch(setTabIsOpen(false))
  }, [pathname, dispatch])

  return (
    <section>
      <BucketOperation />
      <div className='flex flex-col justify-center'>
        {tabIsOpen ? (
          <Outlet />
        ) : (
          <div className='flex flex-col'>
            <Input value={text} dispatchFn={textContent} type='write' />
          </div>
        )}
      </div>
    </section>
  )
}

export default Home
