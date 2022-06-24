import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    console.log(args);
    setLoading(true);
    const response = await apiFunc(...args);
    console.log(response);
    setLoading(false);

    setError(!response);
    setData(response);
    return response;
  };

  return { data, error, loading, request };
};
