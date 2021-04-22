import React from "react";

import { Input, AutoComplete } from "antd";

import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

import useSearch from "../../../hooks/useSearch";

const SearchBar = ({ setCurrentCompanyKey }) => {
  const {
    showNotFound,
    autocompleteValue,
    options,
    optionsLoading,
    onSelect,
    onSearch,
    onChange,
  } = useSearch({
    setCurrentCompanyKey,
  });

  return (
    <AutoComplete
      options={options}
      style={{ width: 350, backgroundColor: "transparent" }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      value={autocompleteValue}
      allowClear
      notFoundContent={showNotFound ? "No results" : null}
    >
      <Input
        style={{
          borderColor: "transparent",
          backgroundColor: "transparent",
          borderRadius: 0,
          paddingTop: 20,
          paddingBottom: 20,
        }}
        size="large"
        placeholder="Search by company name"
        prefix={
          optionsLoading ? (
            <LoadingOutlined />
          ) : (
            <SearchOutlined style={{ color: "#94A3B8" }} />
          )
        }
      />
    </AutoComplete>
  );
};

export default SearchBar;
