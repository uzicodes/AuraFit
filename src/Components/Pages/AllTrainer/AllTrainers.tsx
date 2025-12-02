import { useQuery } from "@tanstack/react-query";
// import CompoHeading from "../../Shared/CompoHeading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Trainer from "../Home/Trainer";
import { FaDumbbell } from "react-icons/fa";
import CompoHeading from "../../Shared/CompoHeading";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();

  // fetched the trainers data using tenstack
  const { data: trainers = [] } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers`);
      // console.log(res.data);
      return res.data;
    },
  });

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
