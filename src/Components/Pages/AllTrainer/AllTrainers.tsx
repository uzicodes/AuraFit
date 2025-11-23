import { useQuery } from "@tanstack/react-query";
// import CompoHeading from "../../Shared/CompoHeading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Trainer from "../Home/Trainer";
import { FaDumbbell } from "react-icons/fa";
import CompoHeading from "../../Shared/CompoHeading";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();
  const [trainers, setTrainers] = useState([]);
  // fetched the trainers data using tenstack
  const { data: trainer = [] } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers`);
      // console.log(res.data);
      return res.data;
    },
  });

  // set the fetched data in usestae
  useEffect(() => {
    setTrainers(trainer);
  }, [trainer]);

  //   console.log(trainers);
  return (
    <div className="px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      <div className="text-center my-16">
        <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <FaDumbbell className="text-sm" />
          Expert Trainers
        </div>
        <CompoHeading
          normHeading="Meet Our"
          colorHeading="Trainers"
          desc="Meet our certified fitness professionals who are dedicated to helping you achieve your health and wellness goals."
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 my-12">
        {trainers.map((trainer) => (
          <Trainer key={trainer._id} trainer={trainer}></Trainer>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
