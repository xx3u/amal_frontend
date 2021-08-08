import React, { useEffect, useMemo, useState } from 'react';
import ErrorAlert from '../UI/ErrorAlert/ErrorAlert';
import axios from '../../axiosApi';

const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    const [error, setError] = useState({});

    useMemo(() => {
      return axios.interceptors.response.use(
        (resp) => {
          return resp;
        },
        (error) => {
          console.dir(error);
          setError(error);
        }
      );
    }, []);

    //useEffect(() => {});

    return (
      <>
        <ErrorAlert message={error.message} />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
