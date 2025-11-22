import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import TrainerRow from "./TrainerRow";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const AdminTrainers = () => {
  const status = `Accepted`
  const axiosPublic = useAxiosPublic();
//   const axiosSecure = useAxiosSecure();
  const [trainers, setTrainers] = useState([]);
  // fetched the trainers data using tenstack
  const { data: trainer = [], refetch, isLoading } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers/${status}`);
      // console.log(res.data);
      return res.data;
    },
  });

  // set the fetched data in usestae
  useEffect(() => {
    setTrainers(trainer);
  }, [trainer]);

      if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
      }

  return (
    <div className="md:mx-20 lg:mx-40 mx-8">
      <h1 className="text-4xl font-medium">
        Total {"Trainer's"} {trainers.length}
      </h1>

      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Favorite Color</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer, i) => (
              <TrainerRow
                i={i}
                key={trainer._id}
                trainer={trainer}
                refetch={refetch}
              ></TrainerRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTrainers;
