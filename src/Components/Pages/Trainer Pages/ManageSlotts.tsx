import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTrainerDetails from "../../hooks/useTrainerDetails";
import SlotRow from "./SlotRow";

const ManageSlots = () => {
  const { trainerDetails, isLoading, error, refetch } = useTrainerDetails();
  const axiosSecure = useAxiosSecure();


  // handle delete 
  const handleDelete = async (dayToDelete) => {
    try {
      const response = await axiosSecure.delete(
        `/trainer/${trainerDetails._id}/slot`,
        {
          data: { dayToDelete },
        }
      );

      console.log(response.data.message); // Assuming the response contains a message

      // Refetch trainer details after deletion
      refetch();
    } catch (error) {
      console.error("Error deleting day:", error);
    }
  };




  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching trainer details.</div>;
  }

  if (
    !trainerDetails ||
    !Array.isArray(trainerDetails.availableDay) ||
    !Array.isArray(trainerDetails.availableTime)
  ) {
    return <div>No available slots data.</div>;
  }

  const { availableDay, availableTime, _id } = trainerDetails;

  return (
    <div className="overflow-x-auto md:mx-20 lg:mx-40 mx-8">
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Status</th>
              <th>Booked By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableDay.map((slot, i) => (
              <SlotRow
                key={i}
                i={i}
                slot={slot}
                onDelete={handleDelete}
                availableTime={availableTime}
              ></SlotRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlots;
