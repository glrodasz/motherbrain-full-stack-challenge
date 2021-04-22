import React, { useState } from "react";
import { groupBy } from "lodash";
import { Spin, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import DateFormat from "../../atoms/DateFormat";
import FundingRoundsPieChart from "../../molecules/FundingRoundsPieChart";
import FundingRoundsTable from "../../molecules/FundingRoundsTable";

import useAllFundings from "../../../hooks/useAllFundings";

import { mapFundingRoundsToPieChartData } from "./helpers";
import { getFundingRoundColor } from "../../helpers";

import formatCurrency from "../../../utils/formatCurrency";
import formatDate from "../../../utils/formatDate";
import useFundingsByDate from "../../../hooks/useFundingsByDate";

const FundingRoundsReport = ({ setCurrentCompanyKey, hideReport }) => {
  const { fundings, fundingsLoading } = useAllFundings();
  const [fundingRoundData, setFundingRoundData] = useState(null);
  const [curentDate, setCurrentDate] = useState(null);
  const { fundingsByDate, fundingsByDateLoading } = useFundingsByDate(
    curentDate
  );

  if (fundingsLoading) {
    return <Spin />;
  }

  const groupedByDate = groupBy(fundings, "announced_on");

  const data = Object.keys(groupedByDate).map((date) => {
    const fundingsPerDate = groupedByDate[date];
    const groupedByInvestment = groupBy(fundingsPerDate, "investment_type");

    const investmentTypes = Object.keys(groupedByInvestment);
    const investmentTotals = investmentTypes.reduce((prev, cur) => {
      prev[cur] = groupedByInvestment[cur].reduce(
        (prev, cur) => prev + Number(cur.raised_amount_usd),
        0
      );
      return prev;
    }, {});

    return {
      name: date,
      ...investmentTotals,
    };
  });

  const types = [...new Set(fundings.map((f) => f.investment_type))];

  return (
    <div style={{ display: hideReport ? "none" : "block" }}>
      <div style={{ width: 1200 }}>
        <BarChart
          width={1200}
          height={500}
          data={data.reverse()}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
          onClick={(data) => {
            setFundingRoundData(data?.activePayload[0]?.payload);
            setCurrentDate(data?.activeLabel);
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={5}
            tickMargin={10}
            tickFormatter={(label) => formatDate(label, { isShort: true })}
          />
          <YAxis
            tickFormatter={(label) => formatCurrency(label, { isShort: true })}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={100} />
          {types.map((type) => (
            <Bar
              type="monotone"
              dataKey={type}
              stackId="1"
              stroke={getFundingRoundColor(type)}
              fill={getFundingRoundColor(type)}
            />
          ))}
        </BarChart>
      </div>
      {fundingRoundData && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Typography.Title level={1}>
              <DateFormat>{curentDate}</DateFormat>
            </Typography.Title>
            <FundingRoundsPieChart
              data={mapFundingRoundsToPieChartData(fundingRoundData)}
            />
          </div>
          {fundingsByDate && (
            <FundingRoundsTable
              loading={fundingsByDateLoading}
              data={fundingsByDate}
              includeCompanies
              setCurrentCompanyKey={setCurrentCompanyKey}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FundingRoundsReport;
