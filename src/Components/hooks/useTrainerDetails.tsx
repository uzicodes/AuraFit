import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useTrainerDetails = () => {
  // TODO: Add authentication later
  const user = null;
  const loading = false;
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
