import { useEffect, useState } from "react";
import CompoHeading from "../../Shared/CompoHeading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import "../../../../src/button.css";
import { useQuery } from "@tanstack/react-query";
import Post from "../Home/Post";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaNewspaper } from "react-icons/fa";

const AllPosts = () => {
  const axiosPublic = useAxiosPublic();
  
  // looping the card based on posts
  const [posts, setPosts] = useState([]); 
  
  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData();
  const itemsPerPage = 6;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  // fetched the data using tenstack query
  const { data: psts = [], isLoading } = useQuery({
    queryKey: ["psts", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/posts?page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  // set the fetched data in usestae
  useEffect(() => {
    setPosts(psts);
  }, [psts]);

  // load the data 
  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  // handle previous page button
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   //   handle next page button
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
       <div className="text-center my-16">
        <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <FaNewspaper className="text-sm" />
          contents
        </div>
        <CompoHeading
          normHeading="Latest"
          colorHeading="Posts"
          desc="Stay updated with the latest fitness tips, workout routines, and wellness insights from our expert community."
        />
      </div>
      <div className="mt-10 gap-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {posts.map((post) => (
          <Post key={post._id} post={post}></Post>
        ))}
      </div>
      <div className="text-center my-10 space-x-8">
        {/* pagination */}
        
        <button onClick={handlePrevPage} className="join-item btn btn-outline">
          Previous page
        </button>
        {pages.map((page, i) => (
          <button
            className={currentPage === page && `selected-btn btn`}
            onClick={() => setCurrentPage(page)}
            key={i}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} className="join-item btn btn-outline">
          Next
        </button>
      </div>
    </div>
    
  );
};

export default AllPosts;
