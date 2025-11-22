import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useNewsletterUsers = () => {
    const axiosPublic = useAxiosPublic();
  const [newsletterUsers, setNewsletterUsers] = useState([]);

  // fetched the newsletter users data using tenstack
  const { data: newsletterUser = [], isLoading } = useQuery({
    queryKey: ["newsletterUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/newsletter`);
      // console.log(res.data);
      return res.data;
    },
  });

  // set the fetched data in usestae
  useEffect(() => {
    setNewsletterUsers(newsletterUser);
  }, [newsletterUser]);
  return {newsletterUsers, isLoading};
};

export default useNewsletterUsers;
