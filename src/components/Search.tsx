import { useState } from "react";
import axios from "axios";
import { Bike } from "../types";

interface Props {
  handleShowFilteredJourneys: (params: any) => any;
}

const Search = ({ handleShowFilteredJourneys }: Props) => {
  const [filterWord, setFilterWord] = useState("");

  const baseUrl = "http://localhost:3007/journeys/search";

  const getFilteredBikes = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await axios.get<Bike[]>(baseUrl, {
      params: { filterWord },
    });
    console.log(response.data);
    handleShowFilteredJourneys(response.data);
  };

  return (
    <form>
      <input
        type="text"
        id="header-search"
        name="search"
        value={filterWord}
        onChange={(event) => setFilterWord(event.target.value)}
      />
      <button onClick={(event) => getFilteredBikes(event)}>Search</button>
    </form>
  );
};

export default Search;
