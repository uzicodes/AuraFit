import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* eslint-disable react/prop-types */
const TrainerRow = ({ i, trainer, refetch }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { _id, name, bio, expertise, pic, experience, slots } = trainer;

  const handleDelete = async (id) => {

    // console.log(id);

    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/trainer/${id}`);
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Trainer has been deleted successfully.",
            icon: "success",
          });
          refetch();
        } catch (error) {
          console.error("Error deleting trainer:", error);

        }
      }
    });
  };
  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={pic} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>{expertise}</td>
      <td>
        {experience} {`year's of experience`}
      </td>
      <th>
        <button
          onClick={() => handleDelete(_id)}
          className="btn bg-red-500 btn-md"
        >
          <FaRegTrashAlt className="text-white" />
        </button>
      </th>
    </tr>
  );
};

export default TrainerRow;
