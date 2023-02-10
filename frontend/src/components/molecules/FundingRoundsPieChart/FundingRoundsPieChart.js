import React from "react";
import { PieChart, Pie, Cell } from "recharts";

import { getFundingRoundLabel, getFundingRoundColor } from "../../helpers";

const FundingRoundsPieChart = ({ data }) => {
  return (
    <div style={{ width: 500, height: 300 }}>
      <PieChart width={500} height={300}>
        <Pie
          minAngle={10}
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          label={getFundingRoundLabel}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getFundingRoundColor(entry.name)}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default FundingRoundsPieChart;
