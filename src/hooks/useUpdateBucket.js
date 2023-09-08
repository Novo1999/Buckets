import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Backend/Supabase";
import { toast } from "react-hot-toast";

export async function updateContent(id, content, favorite) {
  const { data, error } = await supabase
    .from("bucket")
    .update({ content: content, favorite: favorite })
    .eq("id", id)
    .select();

  if (error) throw new Error("There was an error updating the Bucket");
  return data;
}

export function useUpdateBucket() {
  const queryClient = useQueryClient();

  const { mutate: updateBucket } = useMutation({
    mutationFn: updateContent,
    onSuccess: () => {
      toast("Bucket Updated Successfully", {
        duration: 1000,
        position: "top-right",
        style: {
          backgroundColor: "white",
          color: "black",
        },
        icon: "🔃",
      });
      queryClient.invalidateQueries({ queryKey: ["bucket"] });
    },
  });

  return { updateBucket };
}
