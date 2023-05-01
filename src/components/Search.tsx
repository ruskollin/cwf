import { useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Button from "@mui/material/Button";
import { Clear } from '@mui/icons-material';

interface Props {
  filterWord: any;
  setFilterWord: (params: any) => any;
}

const Search = ({ filterWord, setFilterWord }: Props) => {
  const [openSearchTab, setOpenSearchTab] = useState(false);

  return (
    <Box style={{ display: "flex", flexDirection: "row", height: 100}}>
      {/* <Button
        className="searchButton"
        type="button"
        title={openSearchTab ? "Close tab" : "Search"}
        onClick={() => setOpenSearchTab(!openSearchTab)}
      >
        {openSearchTab ? (
          <ArrowRightIcon
            style={{ color: "#ff8383",fontSize: 50, marginTop: -15 }}
          />
        ) : (
          <FindInPageIcon
            style={{ height: 55, borderRadius: "5px", color: "white", background: "#64d984", fontSize: 50, marginTop: -15 }}
          />
        )}
      </Button>{" "} */}
      {/* {openSearchTab && */}
        <TextField
          data-testid="search"
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={filterWord}
          style={{marginTop: 24}}
          onChange={(event: any) => setFilterWord(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <p></p>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {filterWord && (
                  <IconButton onClick={() => setFilterWord("")}>
                    <Clear />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
        />
      {/* } */}
    </Box>
  );
};

export default Search;
