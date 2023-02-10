import React from "react";

import { Typography } from "antd";

import { UserOutlined, ShopOutlined, GlobalOutlined } from "@ant-design/icons";

import Logo from "../../atoms/Logo/Logo";

const CompanyHeader = ({ currentCompany }) => {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <Logo src={`//logo.clearbit.com/${currentCompany.org?.homepage_url}`} />
      <div style={{ marginLeft: 40 }}>
        <Typography.Title level={2} style={{ marginBottom: 10 }}>
          {currentCompany.org?.company_name}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            marginBottom: 10,
            maxWidth: "50em",
          }}
        >
          {currentCompany.org?.short_description}
        </Typography.Paragraph>
        <div style={{ display: "flex" }}>
          {currentCompany.org?.city && (
            <Typography.Paragraph strong>
              <ShopOutlined /> {currentCompany.org?.city},{" "}
              {currentCompany.org?.country_code}
            </Typography.Paragraph>
          )}
          {currentCompany.org?.employee_count &&
            currentCompany.org?.employee_count !== "unknown" && (
              <Typography.Paragraph strong style={{ marginLeft: 15 }}>
                <UserOutlined /> {currentCompany.org?.employee_count} employees
              </Typography.Paragraph>
            )}
          {currentCompany.org?.homepage_url && (
            <Typography.Link
              style={{ marginLeft: 15 }}
              href={currentCompany.org?.homepage_url}
              target="_blank"
            >
              <GlobalOutlined /> Website
            </Typography.Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
