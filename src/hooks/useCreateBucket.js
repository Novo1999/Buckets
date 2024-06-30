import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { supabase } from '../Backend/Supabase'

function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

async function postContent({ content }) {
  const { data, error } = await supabase
    .from('bucket')
    .insert([{ content, color: generateRandomColor() }])
    .select()
  if (error) throw new Error('Error posting new content to bucket')
  return data
}

export function useCreateBucket() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: postContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bucket'] })
      toast('Bucket Added Successfully', {
        duration: 1000,
        position: 'top-right',
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
        icon: '✅',
      })
    },
  })

  return { mutate }
}
