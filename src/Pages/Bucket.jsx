import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Input from '../Components/Input'
import { setEditedContent } from '../features/bucketSlice/bucketSlice'
import { useGetBucket } from '../hooks/useGetBucket'

function Bucket() {
  const { currentContentId, isEditing, editedContent } = useSelector(
    (state) => state.bucket
  )
  const { data } = useGetBucket()
  const { id: paramId } = useParams()
  const dispatch = useDispatch()

  const [clickedItemContent, setClickedItemContent] = useState(
    data?.find((item) => item.id === currentContentId)?.content
  )

  useEffect(() => {
    setClickedItemContent(
      data?.find((item) => item.id === Number(paramId))?.content
    )
  }, [paramId, data])

  // To do the editing on the currently saved content
  useEffect(() => {
    dispatch(setEditedContent(clickedItemContent))
  }, [clickedItemContent, dispatch])

  return (
    <div className='flex flex-col justify-center '>
      <Input
        type='editContent'
        className='border-2 border-black'
        name='content'
        id='content'
        value={isEditing ? editedContent : clickedItemContent}
        currentContentId={currentContentId}
        isEditing={isEditing}
        dispatchFn={setEditedContent}
      />
    </div>
  )
}

export default Bucket
