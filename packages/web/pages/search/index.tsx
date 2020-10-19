import React from "react";
import { AskQ } from "../../components/home/AskQ";
import { Query } from "../../components/search/Query";

const Search: React.FC = () => {
  return (
    <div className="container">
      <AskQ />
      <Query />
    </div>
  );
};

export default Search;
