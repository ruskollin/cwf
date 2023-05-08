import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Clear } from '@mui/icons-material';

interface Props {
  filterWord: any;
  setFilterWord: (params: any) => any;
}

const Search = ({ filterWord, setFilterWord }: Props) => {

  return (
    <Box style={{ display: "flex", flexDirection: "row", height: 100}}>
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
