import { useState, useEffect } from "react";

const useRecentFundings = (quantity) => {
  const [recentFundings, setRecentFundings] = useState([]);
  const [recentFundingsLoading, setRecentFundingsLoading] = useState(true);

  useEffect(() => {
    const url = new URL("http://localhost:8080/fundings");
    url.searchParams.set("limit", quantity);
    url.searchParams.set("sort_by", "announced_on");
    url.searchParams.set("order_by", "desc");
    url.searchParams.set("query", "raised_amount_usd:>0");

    fetch(url)
      .then((response) => response.json())
      .then(({ results: { hits } }) => {
        setRecentFundings(hits);
        setRecentFundingsLoading(false);
      });
  }, [quantity]);

  return { recentFundings, recentFundingsLoading}
};

export default useRecentFundings;
