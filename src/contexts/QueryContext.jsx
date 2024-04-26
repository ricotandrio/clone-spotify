import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const QueryContext = createContext();

const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState(false);

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

QueryProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default QueryProvider;
