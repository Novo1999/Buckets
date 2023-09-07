import { useQuery } from "@tanstack/react-query";
import { supabase } from "../Backend/Supabase";

async function getKey() {
  let { data: key, error } = await supabase.from("key").select("key");
  if (error) throw new Error("Something went wrong");
  return key;
}

const queryKey = "key";
export function useGetKey() {
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: getKey,
  });

  return { data };
}
