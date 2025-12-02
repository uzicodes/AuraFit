import { useQuery } from "@tanstack/react-query";
import ApliedTrainerRow from "../Admin Pages/AdmApliedTrainers/ApliedTrainerRow";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MemberActivity = () => {
  // TODO: Add authentication later
  const user = null;
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const status = `Pending`;
  // fetched the trainers data using tenstack
  const { data: trainer = [], refetch } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers/${status}`);
      // console.log(res.data);
      return res.data;
    },
  });

  // set the fetched data in usestae
  useEffect(() => {
    setAppliedTrainers(trainer);
  }, [trainer]);
  return (
    <>
      {appliedTrainers.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
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

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* User data table row */}
                    {appliedTrainers.map((appTrainer) => (
                      <ApliedTrainerRow
                        key={appTrainer._id}
                        appTrainer={appTrainer}
                        user={user}
                        roleFromHook="Member"
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
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="italic text-3xl font-semibold mt-10 text-gray-700 dark:text-gray-300">
              No Trainer Application Request Found!
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberActivity;
