import React from "react";
import {
  SearchOutlined,
  UserOutlined,
  HomeOutlined,
  GlobalOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Layout,
  AutoComplete,
  Input,
  Typography,
  Space,
  Card,
  Skeleton,
  Empty,
  Table,
} from "antd";

import Currency from "./components/atoms/Currency";
import DateFormat from "./components/atoms/DateFormat";
import Investment from "./components/atoms/Investment";
import Logo from "./components/atoms/Logo";

import useTopCompanies from "./hooks/useTopCompanies";
import useRecentFundings from "./hooks/useTopFundings";
import useCurrentCompany from "./hooks/useCurrentCompany";
import useSearch from "./hooks/useSearch";

import { TOP_COMPANIES_QUANTITY, RECENT_FUNDINGS_QUANTITY } from "./constants";

import "./App.css";

const { Sider, Content } = Layout;
const { Title, Paragraph, Link } = Typography;

export default function App() {
  const { topCompanies, topCompaniesLoading } = useTopCompanies(
    TOP_COMPANIES_QUANTITY
  );

  const { recentFundings, recentFundingsLoading } = useRecentFundings(
    RECENT_FUNDINGS_QUANTITY
  );

  const {
    setCurrenCompanyKey,
    currentCompany,
    currentCompanyLoading,
  } = useCurrentCompany();

  const {
    showNotFound,
    autocompleteValue,
    options,
    optionsLoading,
    onSelect,
    onSearch,
    onChange,
  } = useSearch({
    setCurrenCompanyKey,
  });

  const dataSource = currentCompany?.fundings;

  const columns = [
    {
      title: "Date",
      dataIndex: "announced_on",
      key: "date",
      render: (text) => <DateFormat>{text}</DateFormat>,
    },
    {
      title: "Type",
      dataIndex: "investment_type",
      key: "type",
      render: (text) => <Investment>{text}</Investment>,
    },
    {
      title: "Amount",
      dataIndex: "raised_amount_usd",
      key: "amount",
      render: (text) => <Currency>{text}</Currency>,
    },
    {
      title: "Investors",
      dataIndex: "investor_names",
      key: "investors",
      render: (text) =>
        text
          .replace("{", "")
          .replaceAll('"', "")
          .replace("}", "")
          .split(",")
          .join(", "),
    },
  ];

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        theme="light"
        width={350}
        style={{
          backgroundColor: "#F1F5F9",
          boxShadow:
            "inset 0 4px 6px -1px rgba(0,0,0,0.1), inset 0 2px 4px -1px rgba(0,0,0,0.06)",
        }}
      >
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
        <div
          className="vertical-scrollable"
          style={{
            borderTop: "1px solid #E2E8F0",
            maxHeight: "calc(100vh - 90px)",
            overflowY: "scroll",
            paddingBottom: 20,
          }}
        >
          <div style={{ padding: "0 20px", marginTop: "30px" }}>
            <Title
              level={5}
              type="secondary"
              style={{ textTransform: "uppercase" }}
            >
              Top companies
            </Title>
            {topCompaniesLoading &&
              [...Array(TOP_COMPANIES_QUANTITY)].map((n, index) => (
                <Skeleton key={index} active />
              ))}
            {!topCompaniesLoading && (
              <Space size="middle" direction="vertical">
                {topCompanies.map((org) => (
                  <Card
                    key={org.uuid}
                    style={{
                      width: 310,
                      boxShadow:
                        "0 0 transparent, 0 0 transparent, 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.02)",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                    onClick={(function (name, uuid) {
                      return (e) => setCurrenCompanyKey({ name, uuid });
                    })(org.company_name, org.uuid)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Paragraph strong style={{ marginBottom: 0 }}>
                          {org.company_name}
                        </Paragraph>
                        <Paragraph style={{ marginBottom: 0 }}>
                          {org.funding_rounds} funding rounds
                        </Paragraph>
                      </div>
                      <Title level={5}>
                        <Currency>{org.funding_total_usd}</Currency>
                      </Title>
                    </div>
                  </Card>
                ))}
              </Space>
            )}
          </div>
          <div style={{ padding: "0 20px", marginTop: "30px" }}>
            <Title
              level={5}
              type="secondary"
              style={{ textTransform: "uppercase" }}
            >
              Latest fundings
            </Title>
            {recentFundingsLoading &&
              [...Array(RECENT_FUNDINGS_QUANTITY)].map((n, index) => (
                <Skeleton key={index} active />
              ))}
            {!recentFundingsLoading && (
              <Space size="middle" direction="vertical">
                {recentFundings.map((funding) => (
                  <Card
                    key={funding.funding_round_uuid}
                    style={{
                      width: 310,
                      boxShadow:
                        "0 0 transparent, 0 0 transparent, 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.02)",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                    onClick={(function (name, uuid) {
                      return (e) => setCurrenCompanyKey({ name, uuid });
                    })(funding.company_name, funding.company_uuid)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Paragraph strong style={{ marginBottom: 0 }}>
                          {funding.company_name}
                        </Paragraph>
                        <Paragraph style={{ marginBottom: 0 }}>
                          <DateFormat>{funding.announced_on}</DateFormat>
                        </Paragraph>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <Title level={5}>
                          <Currency>{funding.raised_amount_usd}</Currency>
                        </Title>
                        <Investment>{funding.investment_type}</Investment>
                      </div>
                    </div>
                  </Card>
                ))}
              </Space>
            )}
          </div>
        </div>
      </Sider>
      <Layout>
        <Content style={{ backgroundColor: "#fff" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              padding: "50px 40px 30px",
            }}
          >
            {currentCompanyLoading && (
              <Skeleton avatar paragraph={{ rows: 4 }} active />
            )}
            {!currentCompany && !currentCompanyLoading && (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty
                  image="/images/search.svg"
                  description="Choose or search a company to see the details."
                />
              </div>
            )}
            {currentCompany &&
              currentCompany?.org?.company_name == null &&
              !currentCompanyLoading && (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Empty
                    image="/images/empty.svg"
                    description="There is not deatils about this company."
                  />
                </div>
              )}
            {currentCompany?.org?.company_name && !currentCompanyLoading && (
              <div>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <Logo
                    src={`//logo.clearbit.com/${currentCompany.org?.homepage_url}`}
                  />
                  <div style={{ marginLeft: 40 }}>
                    <Title level={2} style={{ marginBottom: 10 }}>
                      {currentCompany.org?.company_name}
                    </Title>
                    <Paragraph style={{ marginBottom: 5, maxWidth: "60em" }}>
                      {currentCompany.org?.short_description}
                    </Paragraph>
                    <div style={{ display: "flex" }}>
                      {currentCompany.org?.city && (
                        <Paragraph strong>
                          <HomeOutlined /> {currentCompany.org?.city},{" "}
                          {currentCompany.org?.country_code}
                        </Paragraph>
                      )}
                      {currentCompany.org?.employee_count &&
                        currentCompany.org?.employee_count !== "unknown" && (
                          <Paragraph strong style={{ marginLeft: 15 }}>
                            <UserOutlined />{" "}
                            {currentCompany.org?.employee_count} employees
                          </Paragraph>
                        )}
                      {currentCompany.org?.homepage_url && (
                        <Link
                          style={{ marginLeft: 15 }}
                          href={currentCompany.org?.homepage_url}
                          target="_blank"
                        >
                          <GlobalOutlined /> Website
                        </Link>
                      )}
                    </div>
                    {currentCompany.org?.description && (
                      <div style={{ marginTop: 20, maxWidth: "60em" }}>
                        <Title level={4} strong>
                          About
                        </Title>
                        <Paragraph>{currentCompany.org?.description}</Paragraph>
                      </div>
                    )}
                    <div
                      style={{ display: "flex", gap: "0 60px", marginTop: 30 }}
                    >
                      <div>
                        <Title level={1} style={{ margin: 0 }}>
                          <Currency>
                            {currentCompany.org?.funding_total_usd}
                          </Currency>
                        </Title>
                        <Paragraph>Total funding</Paragraph>
                      </div>
                      <div>
                        <Title level={1} style={{ margin: 0 }}>
                          {currentCompany.org?.funding_rounds}
                        </Title>
                        <Paragraph>Funding rounds</Paragraph>
                      </div>
                    </div>
                    {!!currentCompany.fundings?.length && (
                      <div
                        className="table-container"
                        style={{ marginTop: 50 }}
                      >
                        <div style={{ maxWidth: "60em" }}>
                          <Title level={4} strong>
                            Fundings
                          </Title>
                        </div>
                        <Table dataSource={dataSource} columns={columns} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
