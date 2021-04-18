import { useState, useEffect } from "react";

const useTopCompanies = (quantity) => {
  const [topCompanies, setTopCompanies] = useState([]);
  const [topCompaniesLoading, setTopCompaniesLoading] = useState(true);

  useEffect(() => {
    const url = new URL("http://localhost:8080/orgs");
    url.searchParams.set("limit", quantity);
    url.searchParams.set("sort_by", "funding_total_usd");
    url.searchParams.set("order_by", "desc");

    fetch(url)
      .then((response) => response.json())
      .then(({ results: { hits } }) => {
        setTopCompanies(hits);
        setTopCompaniesLoading(false);
      });
  }, []);

  return { topCompanies, topCompaniesLoading}
};

export default useTopCompanies;
