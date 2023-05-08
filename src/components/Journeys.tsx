import { useState, useEffect, useCallback } from "react";
import { Journey } from "../types";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import Search from "./Search";

interface Props {
  journeys: Journey[];
  handleGetNextData: (pageNumber: number) => void;
}

const Journeys = ({ journeys, handleGetNextData }: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });

  const [fromNum, setFromNum] = useState(0);
  const [toNum, setToNum] = useState(100);

  function changeDataTable() {
    setFromNum(fromNum + 100)
    setToNum(toNum + 100) 
    setPaginationModel((prevPaginationModel) => ({
      ...prevPaginationModel,
      page: prevPaginationModel.page + 1,
    }));
  }

  useEffect(() => {
    console.log(fromNum, toNum, paginationModel)
  }, [fromNum, toNum, paginationModel]);

  const CustomPagination = (props: any) => {
    const formatDisplayedRows = () => {
      return `${fromNum}-${toNum} of 770,148+`;
    };
    return (
      <GridPagination
        {...props}
        labelDisplayedRows={formatDisplayedRows}
      />
    );
  };



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

  const handlePaginationChange = (newPaginationModel: any) => {
    console.log(newPaginationModel);
    setPaginationModel(newPaginationModel);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "98.5%",
          marginLeft: 3,
        }}
      >
        <Search filterWord={filterWord} setFilterWord={setFilterWord} />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "auto",
          height: "76vh",
          margin: "auto",
        }}
      >
        <DataGrid
          rows={rows.filter((row: any) => {
            return Object.values(row)
              .join(" ")
              .toLowerCase()
              .includes(filterWord.toLowerCase());
          })}
          columns={columns}
          paginationModel={paginationModel}
          rowCount={journeys.length}
          onPaginationModelChange={handlePaginationChange}
          components={{
            Pagination: CustomPagination,
          }}
        />

        {/* {paginationModel.page === 99 &&
        <button onClick={handleGetNextData}>Next</button> } */}

        {/* <button onClick={() => handleGetNextData(paginationModel.page)}> */}
        <button onClick={() => changeDataTable()}> 
          Next
        </button>
      </Box>
    </Box>
  );
};

export default Journeys;
