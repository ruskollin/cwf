import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface Props {
  time: string;
  label: string;
  setTime: (time: string) => void;
}

function DateTimePicker({ time, label, setTime }: Props) {
  const handleDateChange = (newValue: any) => {
    const dateObj = new Date(newValue.$d);
    const formattedDate = dateObj.toISOString();
    setTime(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker onChange={handleDateChange} label={label}/>
    </LocalizationProvider>
  );
}

export default DateTimePicker;
