

import { useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "../services/getAPI";
export const useUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("unit")
      .then((res) => setUnits(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { units, loading, error };
};
