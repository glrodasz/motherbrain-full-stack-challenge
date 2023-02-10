import React from "react";
import { Typography, Table, Button } from "antd";

import DateFormat from "../../atoms/DateFormat";
import Investment from "../../atoms/Investment";
import Currency from "../../atoms/Currency";

const columns = [
  {
    title: "Date",
    dataIndex: "announced_on",
    key: "date",
    width: "20%",
    render: (text) => <DateFormat>{text}</DateFormat>,
    sorter: (a, b) =>
      new Date(a.announced_on).getTime() - new Date(b.announced_on).getTime(),
  },
  {
    title: "Type",
    dataIndex: "investment_type",
    key: "type",
    width: "10%",
    render: (text) => <Investment>{text}</Investment>,
    sorter: (a, b) => a.investment_type.localeCompare(b.investment_type),
  },
  {
    title: "Amount",
    dataIndex: "raised_amount_usd",
    key: "amount",
    width: "20%",
    render: (text) => <Currency>{text}</Currency>,
    sorter: (a, b) => a.raised_amount_usd - b.raised_amount_usd,
  },
  {
    title: "Investors",
    dataIndex: "investor_names",
    key: "investors",
    width: "30%",
    render: (text) =>
      text.replace(/[{}"]/g, "")
        ? text.replace(/[{}"]/g, "").split(",").join(", ")
        : "—",
  },
];

const companyColumn = (setCurrentCompanyKey = () => {}) => ({
  title: "Company",
  dataIndex: "company_name",
  key: "company_name",
  width: "30%",
  render: (text, record) => (
    <Button
      type="link"
      onClick={() =>
        setCurrentCompanyKey({
          name: text,
          uuid: record.company_uuid,
        })
      }
    >
      {text}
    </Button>
  ),
});

const FundingRoundsTable = ({
  data,
  setCurrentCompanyKey,
  includeCompanies,
  loading,
}) => {
  return (
    <div>
      <div style={{ maxWidth: "60em" }}>
        <Typography.Title level={4} strong>
          Fundings
        </Typography.Title>
      </div>
      <Table
        style={{ width: 820 }}
        dataSource={data}
        columns={
          includeCompanies
            ? [...columns, companyColumn(setCurrentCompanyKey)]
            : columns
        }
        pagination={{ defaultPageSize: 5 }}
        showSizeChanger={false}
        loading={loading}
      />
    </div>
  );
};

export default FundingRoundsTable;
