/* eslint-disable react/prop-types */
import Select from "react-select";

const options = [
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednuesday", label: "Wednuesday" },
  { value: "Thurseday", label: "Thurseday" },
  { value: "Friday", label: "Friday" },
];

export default function DaySlots({ selectedOption, setSelectedOption }) {


  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        isMulti
        options={options}
      />
    </div>
  );
}
