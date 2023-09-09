import { useQuery } from "@tanstack/react-query";
import { supabase } from "../Backend/Supabase";

export async function getAllContent() {
  let { data: bucket, error } = await supabase.from("bucket").select("*");
  if (error) throw new Error("Error getting data from bucket");
  return bucket;
}

const queryKey = "bucket";
export function useGetBucket() {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: getAllContent,
    refetchInterval: 1000,
  });

  return { data, isLoading };
}
