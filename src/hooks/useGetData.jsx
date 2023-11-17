import { useEffect } from 'react';
import PropTypes from 'prop-types';

useGetData.propTypes = {
  _props: PropTypes.string.isRequired,
  _setData: PropTypes.func.isRequired
}

export function useGetData(_props, _setData) {
  useEffect(() => {
    fetch(_props)
    .then(response => {
      if(!response.ok){
        throw new Error('Fail to fetch data');
      }
      return response.json();
    })
    .then(data => {
      _setData({
        data,
        isLoading: false,
        errorMessage: ''
      });
    })
    .catch(error => {
      _setData({
        data: [],
        isLoading: true,
        errorMessage: {error}
      });
    });
  }, []);
}

