import { useState, useEffect } from "react";

const useCurrentCompany = () => {
  const [currentCompanyKey, setCurrenCompanyKey] = useState(null);
  const [currentCompany, setCurrenCompany] = useState(null);
  const [currentCompanyLoading, setCurrentCompanyLoading] = useState(null);

  useEffect(() => {
    if (!currentCompanyKey) {
      return;
    }

    setCurrentCompanyLoading(true);

    const urlFundings = new URL("http://localhost:8080/fundings");
    urlFundings.searchParams.set("limit", 20);
    urlFundings.searchParams.set("query", `company_name:"${currentCompanyKey.name}"`);
    urlFundings.searchParams.set("company_uuid", currentCompanyKey.uuid);

    const urlOrgs = new URL("http://localhost:8080/orgs");
    urlOrgs.searchParams.set("limit", 1);
    urlOrgs.searchParams.set("uuid", currentCompanyKey.uuid);

    Promise.all([
      fetch(urlFundings).then((response) => response.json()),
      fetch(urlOrgs).then((response) => response.json()),
    ]).then(
      ([
        {
          results: { hits: fundingHits },
        },
        {
          results: { hits: orgHits },
        },
      ]) => {
        setCurrenCompany({ org: orgHits[0], fundings: fundingHits });
        setCurrentCompanyLoading(false);
      }
    );
  }, [currentCompanyKey]);

  return { setCurrenCompanyKey, currentCompany, currentCompanyLoading };
};

export default useCurrentCompany;
