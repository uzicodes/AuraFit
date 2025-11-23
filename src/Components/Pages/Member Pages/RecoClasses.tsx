import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CompoHeading from "../../Shared/CompoHeading";
import ClassCard from "../AllClasses/ClassCard";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const RecoClasses = () => {
  const axiosPublic = useAxiosPublic();
  //   const [recoClasses, setRecoClasses] = useState([]);
  // fetched the recomended classes using tenstack
  const { data: recoClasses = [], isLoading } = useQuery({
    queryKey: ["recoClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/recommended-classes`);
      console.log(res.data);
      return res.data;
    },
  });

if (isLoading){
    return <LoadingSpinner></LoadingSpinner>
}
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="italic text-3xl font-semibold mt-10">
        Recommended Classes
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  mt-14 lg:gap-x-20 md:gap-x-10 gap-x-6">
        {recoClasses.map((singleClass) => (
          <ClassCard
            key={singleClass._id}
            singleClass={singleClass}
          ></ClassCard>
        ))}
      </div>
      {/* <h1>heelloo: {recoClass.length}</h1> */}
    </div>
  );
};

export default RecoClasses;
