/* eslint-disable react/prop-types */
// src/TimeRangePickerComponent.js

import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

function TimePicker({ value, setValue }) {
  return (
    <div >
      <TimeRangePicker
        onChange={setValue}
        value={value}
        className="mt-1 rounded"
      />
    </div>
  );
}

export default TimePicker;
