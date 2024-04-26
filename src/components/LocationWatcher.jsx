import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const LocationWatcher = ({children}) => {
  
  console.log("sd");

  const location = useLocation();

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      {children}
    </>
  );
}

LocationWatcher.propTypes = {
  children: PropTypes.node
}

export default LocationWatcher;