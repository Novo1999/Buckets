import { useGetBucket } from "../hooks/useGetBucket";

import { useParams } from "react-router-dom";
import BucketLink from "./BucketLink";

function AllBuckets() {
  const { data } = useGetBucket();
  const { id: route } = useParams();

  return data?.map((item) => {
    return <BucketLink item={item} key={item.id} route={route} />;
  });
}

export default AllBuckets;
