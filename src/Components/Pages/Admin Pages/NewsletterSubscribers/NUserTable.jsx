const NUserTable = ({ newsletterUser , i}) => {
    const { _id , email} = newsletterUser;
  return (
    <tr>
      <th>{i + 1}</th>
      <td>{_id}</td>
      <td>{email}</td>
    </tr>
  );
};

export default NUserTable;
