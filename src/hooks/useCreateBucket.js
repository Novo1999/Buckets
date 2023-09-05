import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Backend/Supabase";
import { toast } from "react-hot-toast";

async function postContent({ title, content }) {
  console.log(title, content);
  const { data, error } = await supabase
    .from("bucket")
    .insert([{ title: title, content: content }])
    .select();
  if (error) throw new Error("Error posting new content to bucket");
  return data;
}

async function getContent() {
  let { data: bucket, error } = await supabase.from("bucket").select("*");
  if (error) throw new Error("Error getting data from bucket");
  return bucket;
}

export function useCreateBucket() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["bucket"],
    queryFn: getContent,
  });

  const { mutate } = useMutation({
    mutationFn: postContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bucket"] });
      toast("Bucket Added Successfully", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "white",
          color: "black",
        },
        icon: "✅",
      });
    },
  });

  return { data, mutate };
}
