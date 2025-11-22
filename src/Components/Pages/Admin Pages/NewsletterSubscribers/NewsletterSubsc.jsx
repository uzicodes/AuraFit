import LoadingSpinner from "../../../Shared/LoadingSpinner";
import useNewsletterUsers from "../../../hooks/useNewsletterUsers";
import NUserTable from "./NUserTable";

const NewsletterSubsc = () => {
  const {newsletterUsers, isLoading} = useNewsletterUsers();
  //   console.log(newsletterUsers);
      if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
      }
  return (
    <div className="overflow-x-auto md:mx-20 lg:mx-40 mx-8">
      <h1 className="text-4xl font-medium">
        Total Newsletter {"Subscriber's"} {newsletterUsers.length}
      </h1>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>User ID</th>
              <th>User email</th>
            </tr>
          </thead>
          <tbody>
            {newsletterUsers.map((newsletterUser, i) => (
              <NUserTable
                key={newsletterUser._id}
                newsletterUser={newsletterUser}
                i={i}
              ></NUserTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterSubsc;
