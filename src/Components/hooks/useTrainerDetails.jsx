import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useTrainerDetails = () => {
  const { user, loading } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const { data: trainerDetails, isLoading, refetch } = useQuery({
    queryKey: ["trainerDetails", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure(
        `/trainerr/${user?.email}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });

  return {trainerDetails, isLoading, refetch};
};

export default useTrainerDetails;
