import { useGetBucket } from '../hooks/useGetBucket'

import { useParams } from 'react-router-dom'
import BucketLink from './BucketLink'
import { useState } from 'react'

function AllBuckets() {
  const [tempFilter, setTempFilter] = useState('// OS')
  const { data } = useGetBucket()
  const { id: route } = useParams()

  return data
    ?.filter((item) => item.content.startsWith(tempFilter))
    .map((item) => {
      return <BucketLink item={item} key={item.id} route={route} />
    })
}

export default AllBuckets
