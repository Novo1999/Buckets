import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Backend/Supabase";

import { toast } from "react-hot-toast";
import { getAllContent } from "./useGetBucket";

export async function updateContent(id, content) {
  const { data, error } = await supabase
    .from("bucket")
    .update({ content: content })
    .eq("id", id)
    .select();

  if (error) throw new Error("There was an error updating the Bucket");
  return data;
}

export function useUpdateBucket() {
  const queryClient = useQueryClient();

  const { mutate: updateBucket } = useMutation({
    mutationFn: getAllContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bucket"] });
      toast("Bucket Updated Successfully", {
        duration: 1000,
        position: "top-right",
        style: {
          backgroundColor: "white",
          color: "black",
        },
        icon: "🔃",
      });
    },
  });

  return { updateBucket };
}
