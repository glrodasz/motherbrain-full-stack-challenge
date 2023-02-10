import React from "react";

import { Typography } from "antd";

import Currency from "../../atoms/Currency";

import FundingRoundsTable from "../FundingRoundsTable";
import FundingRoundsPieChart from "../FundingRoundsPieChart";

import { mapCompanyFundingRoundsToPieChartData } from "./helpers";

const CompanyInfo = ({ currentCompany }) => {
  return (
    <>
      {!!currentCompany.org?.description?.trim().length && (
        <div style={{ marginTop: 40, maxWidth: "60em" }}>
          <Typography.Title level={3} strong>
            About
          </Typography.Title>
          <Typography.Paragraph className="text-clamp">
            {currentCompany.org?.description}
          </Typography.Paragraph>
        </div>
      )}
      <div>
        <div style={{ display: "flex", gap: "0 60px", marginTop: 60 }}>
          <div>
            <Typography.Title level={1} style={{ margin: 0 }}>
              <Currency>{currentCompany.org?.funding_total_usd}</Currency>
            </Typography.Title>
            <Typography.Paragraph>Total funding</Typography.Paragraph>
          </div>
          <div>
            <Typography.Title level={1} style={{ margin: 0 }}>
              {currentCompany.org?.funding_rounds}
            </Typography.Title>
            <Typography.Paragraph>Funding rounds</Typography.Paragraph>
          </div>
        </div>
      </div>
      {!!currentCompany.fundings?.length && (
        <div className="table-container" style={{ marginTop: 50 }}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <FundingRoundsTable data={currentCompany?.fundings} />
            <FundingRoundsPieChart
              data={mapCompanyFundingRoundsToPieChartData(
                currentCompany?.fundings
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyInfo;
