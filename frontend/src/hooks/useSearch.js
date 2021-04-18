import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

import formatCurrency from "../utils/formatCurrency";
import { MIN_CHARACTERS_FOR_SEARCHING } from "../constants";

const useSearch = ({ setCurrenCompanyKey }) => {
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  const onSearch = (searchText) => {
	setShowNotFound(false)

    if (searchText.length >= MIN_CHARACTERS_FOR_SEARCHING) {
      setOptionsLoading(true);
      setOptions([]);
      const url = new URL("http://localhost:8080/orgs");
      url.searchParams.set("limit", 10);
      url.searchParams.set("offset", 0);
      url.searchParams.set("query", `company_name:${searchText}`);

      fetch(url)
        .then((response) => response.json())
        .then(({ results: { hits } }) => {
          if (hits?.length === 0) {
            setShowNotFound(true);
          } else {
			setShowNotFound(false)
		  }

          setOptions(
            hits.map(
              ({
                uuid,
                funding_total_usd,
                company_name,
                city,
                country_code,
              }) => ({
                key: uuid,
                value: uuid,
                label: `${company_name} ${
                  city && country_code ? ` — ${city}, ${country_code}` : ""
                } ${
                  funding_total_usd
                    ? ` — ${formatCurrency(funding_total_usd)}`
                    : ""
                }`,
                name: company_name,
                uuid: uuid,
              })
            )
          );
          setOptionsLoading(false);
        });
    } else if (searchText.length === 0) {
      setOptions([]);
      setOptionsLoading(false);
	  setShowNotFound(false)
    }
  };

  const debouncedOnSearch = useCallback(
    debounce((nextValue) => onSearch(nextValue), 500),
    []
  );

  const onSelect = (value, option) => {
    setCurrenCompanyKey({ name: option.name, uuid: value });
    setAutocompleteValue(option.name);
  };

  const onChange = (value) => setAutocompleteValue(value);

  return {
    onSelect,
    onSearch: debouncedOnSearch,
    onChange,
    autocompleteValue,
    options,
    optionsLoading,
	showNotFound
  };
};

export default useSearch;
