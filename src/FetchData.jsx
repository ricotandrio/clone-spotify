import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function getData(_props, _setData) {
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

getData.propTypes = {
  _props: PropTypes.string.isRequired,
  _setData: PropTypes.func.isRequired
}

