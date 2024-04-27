import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useDebounce } from "use-debounce";

export const QueryContext = createContext();

const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState(false);
  const [queryDebounce] = useDebounce(query, 1500);

  return (
    <QueryContext.Provider value={{ query, queryDebounce, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

QueryProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default QueryProvider;
