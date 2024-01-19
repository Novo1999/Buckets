import { useSelector } from 'react-redux'
import { MdOutlineSystemUpdateAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Button({ updateFn, type, children, to, onClick }) {
  const { isEditing, currentContentId, editedContent } = useSelector(
    (state) => state.bucket
  )

  const handleUpdate = () => {
    const input = prompt('ENTER PASSWORD 🙃')
    console.log(input)
    if (input === 'kosai') {
      updateFn(currentContentId, editedContent)
    }
  }

  if (type === 'link') {
    return (
      <Link
        to={to}
        onClick={onClick}
        className='relative text-white bottom-2 border-2 text-sm drop-shadow-lg shadow-xl px-2 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300'
      >
        {children}
      </Link>
    )
  }
  return (
    isEditing && (
      <div className='bg-white text-black px-4 py-2 rounded-md absolute top-7 right-[4rem] sm:right-[7.5rem]  cursor-pointer'>
        <button
          onClick={handleUpdate}
          value='Update'
          className='flex items-center gap-2'
        >
          <MdOutlineSystemUpdateAlt />
          <span className='hidden md:block'>Update</span>
        </button>
      </div>
    )
  )
}

export default Button
