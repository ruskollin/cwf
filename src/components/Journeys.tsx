import { useState, useEffect, useCallback } from "react";
import { Journey } from "../types";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import Search from "./Search";

interface PaginationModel {
  pageSize: number;
  page: number;
}

interface Props {
  journeys: Journey[];
  handleGetNextData: (newPaginationModel: PaginationModel) => void;
  totalJourneys: number;
  setPaginationModel: (newPaginationModel: PaginationModel) => void;
  paginationModel: PaginationModel;
  totalPages: number;
}

const Journeys = ({
  journeys,
  handleGetNextData,
  totalJourneys,
  setPaginationModel,
  paginationModel,
  totalPages,
}: Props) => {
  const [filterWord, setFilterWord] = useState("");
  const [fromNum, setFromNum] = useState(1);
  const [toNum, setToNum] = useState(100);

  const CustomPagination = (props: any) => {
    const formatDisplayedRows = () => {
      return `${fromNum}-${toNum} of ${totalJourneys}`;
    };
    return (
      <GridPagination {...props} labelDisplayedRows={formatDisplayedRows} />
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

  const handlePaginationChange = (newPaginationModel: PaginationModel) => {
    setPaginationModel(newPaginationModel);
    handleGetNextData(newPaginationModel);
    const startRow = newPaginationModel.page * newPaginationModel.pageSize;
    const endRow =
      newPaginationModel.page === 0
        ? newPaginationModel.pageSize
        : newPaginationModel.page * newPaginationModel.pageSize +
          newPaginationModel.pageSize;
    setFromNum(startRow);
    setToNum(endRow);
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
          rowCount={totalPages}
          paginationMode="server"
          onPaginationModelChange={handlePaginationChange}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </Box>
    </Box>
  );
};

export default Journeys;
