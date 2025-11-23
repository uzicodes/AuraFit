/* eslint-disable react/prop-types */

import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SlotRow = ({ availableTime, i, slot, onDelete }) => {
  // handle delete slot

  return (
    <tr>
      <th>{i + 1}</th>
      <td>{slot.value}</td>
      <td>
        {availableTime[0]} to {availableTime[1]}
      </td>
      <td>None</td>
      <td>
        <button
          onClick={() => onDelete(slot.value)}
          className="btn bg-red-500 btn-md"
        >
          <FaRegTrashAlt className="text-white" />
        </button>
      </td>
    </tr>
  );
};

export default SlotRow;
