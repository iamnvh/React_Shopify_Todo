import { useEffect, useState } from "react";

export default function useFetchApi({ url, datas }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(url);
      const respData = await res.json();

      setData(respData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    setData,
    loading,
    setLoading,
  };
}
