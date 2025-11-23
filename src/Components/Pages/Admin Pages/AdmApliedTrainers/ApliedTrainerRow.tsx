import { useState } from "react";
import UpdateUserModal from "./UpdateUserModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
const ApliedTrainerRow = ({ user, appTrainer, roleFromHook, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isReject, setIsReject] = useState(false);
  const axiosSecure = useAxiosSecure();

  //
  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/trainer/update/${appTrainer?.email}`,
        role
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success("Member role updated successfully!");
      setIsOpen(false);
    },
  });
  //

  // handle modal
  const modalHandler = async (selected) => {
    if (appTrainer.email === user.email) {
      toast.error("Action Not Allowed");
      return setIsOpen(false);
    }

    const userRole = {
      role: selected,
      status: "Accepted",
    };

    try {
      await mutateAsync(userRole);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const { status, email, role } = appTrainer;
  return (
    <tr>
      {refetch}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className=" whitespace-no-wrap ">{role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className=" whitespace-no-wrap text-yellow-500">{status}</p>
        )}
      </td>
      {roleFromHook === "Admin" && (
        <td className="px-5 py-5 border-b border-gray-200  text-sm">
          <button
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-white leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 text-white bg-[#21BDCE] rounded-full"
            ></span>
            <span className="relative ">Update Role</span>
          </button>
          {/* Update User Modal */}
          <UpdateUserModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalHandler={modalHandler}
            appTrainer={appTrainer}
          ></UpdateUserModal>
        </td>
      )}
    </tr>
  );
};

export default ApliedTrainerRow;
