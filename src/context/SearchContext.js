import React, { useState, createContext, useContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [departureDate, setDepartureDate] = useState([]);
  const [returnDate, setReturnDate] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        searchResults,
        setSearchResults,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
