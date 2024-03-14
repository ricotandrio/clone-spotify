import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const QueryContext = createContext();

QueryProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default function QueryProvider({ children }){
  const [query, setQuery] = useState(false);
  
  return(
    <QueryContext.Provider value={{ query, setQuery }}>
      { children }
    </QueryContext.Provider>
  )
}
