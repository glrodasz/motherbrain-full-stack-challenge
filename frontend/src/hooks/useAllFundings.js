import { useState, useEffect } from "react";

const MAX_READ_LIMIT = 1000;
const TOTAL_RECORDS_LIMIT = 10000;

const useAllFundings = () => {
  const [offset, setOffset] = useState(0);
  const [fundings, setFundings] = useState([]);
  const [fundingsLoading, setFundingsLoading] = useState(true);

  useEffect(() => {
    const url = new URL("http://localhost:8080/fundings");
    url.searchParams.set("limit", MAX_READ_LIMIT);
    url.searchParams.set("offset", offset);
    url.searchParams.set("sort_by", "announced_on");
    url.searchParams.set("order_by", "desc");
    url.searchParams.set("query", "raised_amount_usd:>0");

    fetch(url)
      .then((response) => response.json())
      .then(({ results: { hits } }) => {
        setFundings(fundings.concat(hits));
        setFundingsLoading(false);

        if (offset < TOTAL_RECORDS_LIMIT - MAX_READ_LIMIT) {
          setOffset(offset + MAX_READ_LIMIT);
        }
      });
  }, [offset]);

  return { fundings, fundingsLoading };
};

export default useAllFundings;
