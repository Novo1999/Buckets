import { useDispatch } from 'react-redux'

import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { FaCheck, FaCopy } from 'react-icons/fa'
import { setIsEditing, setIsFocused } from '../features/bucketSlice/bucketSlice'
import { updateContent, useUpdateBucket } from '../hooks/useUpdateBucket'
import Button from './Button'

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
  const splittedValue = value?.split('\n')?.slice(2)
  const contentStartsWithLAB = value?.startsWith('LAB')

  return (
    <div className='relative p-4 flex justify-center bg-gradient-to-t from-gray-700 via-gray-900 to-black h-full lg:h-[33.1rem] xl:h-full'>
      {type === 'editContent' && <Button updateFn={handleUpdate} />}
      {/* copy to clipboard */}
      {type !== 'write' && !contentStartsWithLAB && (
        <CopyToClipboard text={value} onCopy={handleCopy}>
          <button className='absolute top-7 bg-white text-black right-6 w-fit p-2 rounded-md flex items-center gap-2 copy-btn'>
            {copied === currentContentId ? (
              <>
                <FaCheck /> <span className='hidden md:block'>Copied</span>
              </>
            ) : (
              <>
                <FaCopy /> <span className='hidden md:block'>Copy</span>
              </>
            )}
          </button>
        </CopyToClipboard>
      )}
      {contentStartsWithLAB ? (
        <div>
          <div className='flex flex-col gap-12 mb-4'>
            {splittedValue.map((val, index) => {
              // Extract the project name and URL from the val string
              const [projectName, url] = val.split(' -> ')

              return (
                <div
                  className='text-white w-full bg-white p-4 rounded-lg'
                  key={index}
                >
                  <a
                    className='text-blue-500 bg-white px-12 rounded-lg underline'
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {projectName}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
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
          className='border-2 text-area focus:border-4 rounded-lg transition-all duration-100 ease-in border-white focus:outline-none w-full h-[36rem] lg:h-[40rem] xl:h-[45rem]
         px-2 resize-none overflow-y-auto pt-[6px] bg-gradient-to-t from-gray-700 via-gray-900 to-black placeholder:text-white text-white 2xl:h-[45rem] pr-28 font-normal text-lg'
        ></textarea>
      )}
    </div>
  )
}

export default Input
