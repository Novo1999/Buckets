/* eslint-disable react/prop-types */
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  setCurrentContent,
  setIsDeleting,
  setTabIsOpen,
} from '../features/bucketSlice/bucketSlice'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { formatDate } from '../helper'
import { updateContent } from '../hooks/useUpdateBucket'
import useWindowDimensions from '../hooks/useWindowDimensions'

function BucketLink({ item, onPage, route }) {
  const dispatch = useDispatch()
  const { id: routeId } = useParams()
  const { width } = useWindowDimensions()

  function handleClick(id) {
    dispatch(setCurrentContent(id))
  }

  useEffect(() => {
    if (!routeId) return
    dispatch(setCurrentContent(routeId))
    dispatch(setTabIsOpen(true))
  }, [routeId, dispatch])

  function setContentLength() {
    if (
      (item.content.length > 300 && width < 767) ||
      (item.content.length > 300 && width > 1280)
    ) {
      return `${item?.content.slice(0, 300)}...`
    }
    if (width > 767) {
      return `${item?.content.slice(0, 100)}...`
    }
    return item.content
  }

  function handleFavorite(e, id, content, favorite) {
    e.preventDefault()
    updateContent(id, content, favorite)
    if (favorite) toast.success('Added to favorites')
    if (!favorite)
      toast.success('Removed from favorites', {
        icon: '⤴',
      })
  }

  if (onPage === 'list') {
    return (
      <Link
        key={item.id}
        to={`/bucket/${item.id}`}
        onClickCapture={() => handleClick(item.id)}
        className={`shadow-md p-3 gap-x-4 lg:w-56 w-fit sm:w-80 md:w-52  mb-10 xl:w-80 relative flex px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:scale-105 transition-all duration-300 rounded-md mx-auto`}
        style={{ backgroundColor: item.color }}
      >
        <div className='flex flex-col transition-all duration-500 gap-2 sm:gap-4'>
          <span
            onClick={(e) =>
              handleFavorite(
                e,
                item.id,
                item.content,
                item.favorite ? false : true
              )
            }
            className='text-xl'
          >
            {item.favorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>
          <p className='text-sm sm:text-md lg:text-base'>ID: {item.id}</p>
          <p className=' font-thin text-sm lg:text-base'>
            Created: {formatDate(item.created_at)}
          </p>
          <p className='drop-shadow-lg font-normal break-all text-sm lg:text-base'>
            {setContentLength()}
          </p>
        </div>
        <button
          className='hover:scale-125 text-white transition-all absolute top-4 right-2 duration-300 cross text-xl md:text-2xl'
          onClick={(e) => {
            e.preventDefault()
            dispatch(setIsDeleting(true))
          }}
        >
          <MdDeleteForever />
        </button>
      </Link>
    )
  }

  return (
    <Link
      key={item.id}
      to={`/bucket/${item.id}`}
      onClickCapture={() => handleClick(item.id)}
      className={`shadow-md p-2 w-full gap-x-4 h-fit mr-8 flex justify-between items-center px-2 drop-shadow-md text-white cursor-pointer font-semibold text-lg hover:border-2 rounded-md ${
        Number(route) === item.id && 'border-2'
      }`}
      style={{ backgroundColor: item.color }}
    >
      <div className='flex flex-col relative'>
        {item.favorite && (
          <span className='absolute top-[-16px] left-[-12px] z-10 flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-md bg-white opacity-30 top-1'></span>
            <AiFillStar />
          </span>
        )}
        {Number(route) === item.id ? (
          <span className='text-xs font-thin'>
            Created at : {formatDate(item.created_at)}
          </span>
        ) : (
          ''
        )}
        <p className='drop-shadow-lg text-sm w-max block min-[375px]:hidden'>
          {item.content?.length > 8
            ? `${item.content.slice(0, 10)}`
            : item.content}
        </p>
        <p className='drop-shadow-lg text-sm w-max hidden min-[375px]:block'>
          {item.content?.length > 8
            ? `${item.content.slice(0, 13)}...`
            : item.content}
        </p>
      </div>
      <button
        className='hover:scale-125 text-white transition-all duration-300 cross'
        onClick={() => dispatch(setIsDeleting(true))}
      >
        <MdDeleteForever />
      </button>
    </Link>
  )
}

export default BucketLink
