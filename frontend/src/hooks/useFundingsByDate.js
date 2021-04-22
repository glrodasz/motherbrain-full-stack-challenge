import { useState, useEffect } from "react";

const useFundingsByDate = (date) => {
  const [fundingsByDate, setFundingsByDate] = useState([]);
  const [fundingsByDateLoading, setFundingsByDateLoading] = useState(true);

  useEffect(() => {
    setFundingsByDateLoading(true);

    const url = new URL("http://localhost:8080/fundings");
    url.searchParams.set("limit", 1000);
    url.searchParams.set("sort_by", "announced_on");
    url.searchParams.set("order_by", "desc");
    url.searchParams.set("query", `announced_on:"${date}"`);

    fetch(url)
      .then((response) => response.json())
      .then(({ results: { hits } }) => {
        setFundingsByDate(hits);
        setFundingsByDateLoading(false);
      });
  }, [date]);

  return { fundingsByDate, fundingsByDateLoading };
};

export default useFundingsByDate;
