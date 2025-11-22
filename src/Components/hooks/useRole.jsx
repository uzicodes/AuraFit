import useAuthContext from "./useAuthContext";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useRole = () => {
  const { user, loading } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`, {
        withCredentials: true,
      });
      return data.role;
    },
  });

  //   Fetch user info using logged in user email

  return [role, isLoading];
};

export default useRole;
