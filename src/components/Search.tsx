import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

interface Props {
  filterWord: any;
  setFilterWord: (params: any) => any;
}

const Search = ({ filterWord, setFilterWord }: Props) => {

  return (
   <Box>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={filterWord}
          onChange={(event: any) => setFilterWord(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <p></p>
              </InputAdornment>
            ),
          }}
        />
      </Box>
  );
};

export default Search;
