import React, { useState } from "react";
import useAllFundings from "./hooks/useAllFundings";
import { groupBy } from "lodash";
import { Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { TAG_COLORS } from "./constants";

const FullReport = () => {
  const { fundings, fundingsLoading } = useAllFundings();

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
    <div style={{ width: "100%", height: 600 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={400}
          data={data.reverse()}
          margin={{
            top: 10,
            right: 30,
            left: 50,
            bottom: 0,
          }}
          onClick={(data, index) => console.log(">>>data", data, index)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {types.map((type) => (
            <Bar
              type="monotone"
              dataKey={type}
              stackId="1"
              stroke={TAG_COLORS[type]}
              fill={TAG_COLORS[type]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FullReport;
