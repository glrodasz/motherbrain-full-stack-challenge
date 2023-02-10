import React from "react";

import { Card, Typography } from "antd";

import DateFormat from "../../atoms/DateFormat";
import Currency from "../../atoms/Currency";
import Investment from "../../atoms/Investment";

const SideCard = ({
  uuid,
  funding_round_uuid,
  company_uuid,
  company_name,
  funding_rounds,
  funding_total_usd,
  announced_on,
  investment_type,
  raised_amount_usd,
  setCurrentCompanyKey,
}) => {
  const companyUuid = uuid || company_uuid;

  return (
    <Card
      key={uuid || funding_round_uuid}
      style={{
        width: 310,
        boxShadow:
          "0 0 transparent, 0 0 transparent, 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.02)",
        borderRadius: 6,
        cursor: "pointer",
      }}
      onClick={(function (name, uuid) {
        return (e) => {
          setCurrentCompanyKey({ name, uuid });
        };
      })(company_name, companyUuid)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography.Paragraph strong style={{ marginBottom: 0 }}>
            {company_name}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            {funding_rounds && `${funding_rounds} funding rounds`}
            {announced_on && <DateFormat>{announced_on}</DateFormat>}
          </Typography.Paragraph>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography.Title level={5}>
            <Currency>{funding_total_usd || raised_amount_usd}</Currency>
          </Typography.Title>
          {investment_type && <Investment>{investment_type}</Investment>}
        </div>
      </div>
    </Card>
  );
};

SideCard.defaultProps = {
  setCurrentCompanyKey: () => {},
};

export default SideCard;
