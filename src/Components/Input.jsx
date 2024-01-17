import { useDispatch } from 'react-redux'

import { updateContent, useUpdateBucket } from '../hooks/useUpdateBucket'
import Button from './Button'
import { setIsEditing, setIsFocused } from '../features/bucketSlice/bucketSlice'
import { FaCheck, FaCopy } from 'react-icons/fa'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'

function Input({ value, dispatchFn, type, currentContentId, isEditing }) {
  const dispatch = useDispatch()
  const { updateBucket } = useUpdateBucket()
  const [copied, setCopied] = useState()

  function handleCopy() {
    setCopied(currentContentId)
    toast.success('Text Copied', { position: 'bottom-right' })
  }

  // resetting copy button status after 2 seconds from copying
  useEffect(() => {
    if (copied !== null) {
      setTimeout(() => {
        setCopied(null)
      }, 2000)
    }
  }, [copied])

  // Changes the text area
  function handleChange(e) {
    dispatch(dispatchFn(e.target.value))
  }

  function handleUpdate(id, content) {
    updateContent(id, content)
    updateBucket()
    dispatch(setIsEditing(false))
  }

  return (
    <div className='relative p-4 flex justify-center bg-gradient-to-t from-gray-700 via-gray-900 to-black h-full lg:h-[33.1rem] xl:h-full'>
      {type === 'editContent' && <Button updateFn={handleUpdate} />}
      {/* copy to clipboard */}
      {type !== 'write' && (
        <CopyToClipboard text={value} onCopy={handleCopy}>
          <button className='absolute top-7 bg-white text-black right-[10rem] w-fit p-2 rounded-md flex items-center gap-2 copy-btn'>
            {copied === currentContentId ? (
              <>
                <FaCheck /> <span>Copied</span>
              </>
            ) : (
              <>
                <FaCopy /> <span>Copy</span>
              </>
            )}
          </button>
        </CopyToClipboard>
      )}
      <textarea
        spellCheck='false'
        autoFocus={type === 'write'}
        value={value}
        onBlur={() => setIsFocused(false)}
        onFocus={() => {
          setIsFocused(true)
          type === 'editContent' && dispatch(setIsEditing(true))
        }}
        onChange={(e) => handleChange(e)}
        type='text'
        placeholder='Text...'
        className='border-2 focus:border-4 rounded-lg transition-all duration-100 ease-in border-white focus:outline-none w-full h-[36rem] lg:h-[40rem] xl:h-[45rem]
         px-2 resize-none overflow-y-auto pt-[6px] bg-gradient-to-t from-gray-700 via-gray-900 to-black placeholder:text-white text-white 2xl:h-[45rem] pr-28 font-normal text-lg'
      ></textarea>
      {/* {linksInCurrentField.links.length > 0 &&
        createPortal(
          <div className='absolute top-2 right-2 rounded-md bg-white flex flex-col gap-2 p-2'>
            <p className='font-semibold text-center'>LINKS HERE</p>
            {linksInCurrentField.links.map((link, index) => (
              <a
                target='blank'
                className='text-blue-600 underline'
                key={index}
                href={link}
              >
                {link}
              </a>
            ))}
          </div>,
          document.body
        )} */}
    </div>
  )
}

export default Input
