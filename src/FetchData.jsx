import React, { useEffect, useState } from 'react'

export default function getData(props, setData) {

  useEffect(() => {
    fetch(props)
    .then(response => {
      if(!response.ok){
        throw new Error('Fail to fetch data');
      }
      return response.json();
    })
    .then(data => {
      setData({
        data,
        isLoading: false,
        errorMessage: ''
      });
    })
    .catch(error => {
      setData({
        data: [],
        isLoading: true,
        errorMessage: {error}
      });
    });
  }, []);
}


