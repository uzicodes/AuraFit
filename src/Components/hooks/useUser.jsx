import useAuthContext from "./useAuthContext";
// import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useUser = () => {
  const { user, loading } = useAuthContext();

  const axiosPublic = useAxiosPublic();

  const {
    data: userDetails,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDetails", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const response = await axiosPublic(`/user/${user?.email}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return [userDetails, isLoading];
};

export default useUser;
