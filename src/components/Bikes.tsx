import { useState} from "react";
import Paper from "@mui/material/Paper";
import { Bike } from "../types";
import Box from "@mui/material/Box";
import { Station } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Search from "./Search";
import AddJourney from "./AddJourney";
import { Pagination } from '@mui/material';

interface Props {
  stations: Station[];
  journeys: Bike[];
}

const Bikes = ({ journeys, stations }: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [filterWordDistance, setFilterWordDistance] = useState(0);
  const [filterWordDuration, setFilterWordDuration] = useState(0);
  const [chosenFilterField, setChosenFilterField] = useState("");
  const filterFields = [
    {
      value: "Departure Station Name",
      label: "Departure Station Name",
    },
    {
      value: "Return Station Name",
      label: "Return Station Name",
    },
    {
      value: "Covered Distance",
      label: "Covered Distance",
    },
    {
      value: "Duration",
      label: "Duration",
    },
  ];

  const [page, setPage] = useState(0);

  const columns: GridColDef[] = [
    {
      field: "Departure_station_name",
      headerName: "Departure Station Name",
      width: 150,
    },
    {
      field: "Return_station_name",
      headerName: "Return Station Name",
      width: 200,
    },
    {
      field: "Covered_distance",
      headerName: "Covered Distance",
      width: 150,
      valueGetter: (params) => Number.parseFloat(params?.value).toFixed(2),
    },
    {
      field: "Duration",
      headerName: "Duration",
      width: 150,
      valueGetter: (params) => Number.parseFloat(params?.value).toFixed(2),
    },
  ];

  const rows = journeys?.map((x) => ({
    id: x.id,
    Departure_station_name: x.Departure_station_name,
    Return_station_name: x.Return_station_name,
    Covered_distance: x.Covered_distance,
    Duration: x.Duration,
  }));

  const handlePageChange = (params: any) => {
    setPage(params.page);
  };

  // useEffect(() => {
  //   console.log(isNumber(filterWord))
  //  if(isNumber(filterWord)) {
  //   const numSearchValue = parseFloat(filterWord)
  //   setFilterNumb(numFilterDistance)
  //  }
  // }, [filterWord]);

  // function isNumber(input: any) {
  //   return /^-?\d*\.?\d+$/.test(input);
  // }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: 900 }}>
      <AddJourney stations={stations}/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          padding: 2,
        }}
      >
        <Search filterWord={filterWord} setFilterWord={setFilterWord} />
      </Box>
      <DataGrid
        rows={rows.filter((row: any) => {
          return Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(filterWord.toLowerCase());
        })}
        columns={columns}
        pagination
      />
    </Paper>
  );
};

export default Bikes;
