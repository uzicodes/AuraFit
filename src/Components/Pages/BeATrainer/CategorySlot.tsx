/* eslint-disable react/prop-types */
import Select from "react-select";

const options = [
  { value: "HIIT", label: "HIIT" },
  { value: "YOGA", label: "YOGA" },
  { value: "STRENGTH", label: "STRENGTH" },
];


export default function DaySlots({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="App">
      <Select
        defaultValue={selectedCategory}
        onChange={setSelectedCategory}
        isMulti
        options={options}
      />
    </div>
  );
}
