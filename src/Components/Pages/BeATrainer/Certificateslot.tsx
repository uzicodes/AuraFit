/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";

const options = [
  {
    value: "Bachelor of Science in Exercise Science",
    label: "Bachelor of Science in Exercise Science",
  },
  {
    value: "Bachelor of Science in Kinesiology",
    label: "Bachelor of Science in Kinesiology",
  },
  {
    value: "Bachelor of Science in Sports Science",
    label: "Bachelor of Science in Sports Science",
  },
  {
    value: "Bachelor of Science in Nutrition",
    label: "Bachelor of Science in Nutrition",
  },
  {
    value: "Bachelor of Science in Physical Education",
    label: "Bachelor of Science in Physical Education",
  },
  {
    value: "Master of Science in Exercise Science",
    label: "Master of Science in Exercise Science",
  },
  {
    value: "Master of Science in Kinesiology",
    label: "Master of Science in Kinesiology",
  },
  {
    value: "Master of Science in Sports Science and Rehabilitation",
    label: "Master of Science in Sports Science and Rehabilitation",
  },
  {
    value: "Master of Science in Nutrition and Dietetics",
    label: "Master of Science in Nutrition and Dietetics",
  },
  { value: "Master of Public Health", label: "Master of Public Health" },
];
const Certificateslot = ({ selectedCert, setSelectedCert }) => {
  return (
    <div className="App">
      <Select
        defaultValue={selectedCert}
        onChange={setSelectedCert}
        isMulti
        options={options}
      />
    </div>
  );
};

export default Certificateslot;
