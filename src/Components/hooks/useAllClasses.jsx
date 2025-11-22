import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllClasses = (currentPage, itemsPerPage) => {
  const axiosPublic = useAxiosPublic();
  const { data: cls = [], isLoading } = useQuery({
    queryKey: ["cls", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/classes?page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  return [cls, isLoading];
};

export default useAllClasses;
