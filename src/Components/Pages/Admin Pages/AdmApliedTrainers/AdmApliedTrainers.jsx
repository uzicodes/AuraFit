import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import ApliedTrainerRow from "./ApliedTrainerRow"
import noDataFound from "../../../../assets/data_not_found.svg";
import useAuthContext from "../../../hooks/useAuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
const AdmApliedTrainers = () => {
  const { user } = useAuthContext();
  const [roleFromHook] = useRole();
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const axiosSecure = useAxiosSecure();
  const status = `Pending`;
  // fetched the trainers data using tenstack
  const { data: trainer = [], refetch, isLoading } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${status}`);
      // console.log(res.data);
      return res.data;
    },
  });

  // set the fetched data in usestae
  useEffect(() => {
    setAppliedTrainers(trainer);
  }, [trainer]);

    if (isLoading) {
      return (
        <LoadingSpinner></LoadingSpinner>
      );
    }


  return (
    <>
      {appliedTrainers.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          {/*  */}
          <h1 className="text-4xl font-medium">
            Total Aplied {"Trainer's"} {appliedTrainers.length}
          </h1>
          {/*  */}
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Status
                      </th>

                      {roleFromHook === "Admin" && (
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* User data table row */}
                    {appliedTrainers.map((appTrainer) => (
                      <ApliedTrainerRow
                        key={appTrainer._id}
                        appTrainer={appTrainer}
                        user={user}
                        roleFromHook={roleFromHook}
                        refetch={refetch}
                      ></ApliedTrainerRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img className="" src={noDataFound} />
          <h1 className="italic text-3xl font-semibold mt-10">
            No Trainer Application Request Found!
          </h1>
        </div>
      )}
    </>
  );
};

export default AdmApliedTrainers;
