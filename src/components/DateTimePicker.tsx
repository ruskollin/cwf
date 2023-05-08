import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface Props {
  label: string;
  setTime: (time: Date) => void;
}

function DateTimePicker({ label, setTime }: Props) {
  
  const handleDateChange = (newValue: any) => {
    const dateObj = new Date(newValue.$d);
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
