import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../config";

export const useAuthenticatedLinks = (authToken) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const options = {
          method: "GET",
          url: `${baseUrl}/link`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const response = await axios.request(options);
        console.log(response.data.data)
        setLinks(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (authToken) {
      fetchLinks();
    }
  }, [authToken]);

  return { links, loading, error };
};
