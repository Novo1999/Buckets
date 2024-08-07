import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { supabase } from '../Backend/Supabase'
import { getAllContent } from './useGetBucket'

export async function deleteContent(id) {
  const { data, error } = await supabase.from('bucket').delete().eq('id', id)
  if (error) throw new Error('Error Deleting Bucket')
  return data
}

export function useDeleteBucket() {
  const queryClient = useQueryClient()

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: getAllContent,
    onSuccess: () => {
      toast.success('Deleted Successfully')
      queryClient.invalidateQueries({ queryKey: ['bucket'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { mutate, isDeleting }
}
