import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface Props {
  time: Date;
  label: string;
  setTime: (time: Date) => void;
}

function DateTimePicker({ time, label, setTime }: Props) {
  
  const handleDateChange = (newValue: any) => {
    const dateObj = new Date(newValue.$d);
    console.log(dateObj)
    // const formattedDate = dateObj.toISOString();
    setTime(dateObj);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        onChange={handleDateChange}
        label={label}
      />
    </LocalizationProvider>
  );
}

export default DateTimePicker;
