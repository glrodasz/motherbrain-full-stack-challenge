import React, { useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShopOutlined,
  GlobalOutlined,
  LoadingOutlined,
  DollarOutlined,
  LeftOutlined,
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
  Button,
} from "antd";
import { PieChart, Pie, Cell } from "recharts";

import Currency from "./components/atoms/Currency";
import DateFormat from "./components/atoms/DateFormat";
import Investment from "./components/atoms/Investment";
import Logo from "./components/atoms/Logo";

import useTopCompanies from "./hooks/useTopCompanies";
import useRecentFundings from "./hooks/useTopFundings";
import useCurrentCompany from "./hooks/useCurrentCompany";
import useSearch from "./hooks/useSearch";

import {
  TAG_NAMES,
  TAG_COLORS,
  TOP_COMPANIES_QUANTITY,
  RECENT_FUNDINGS_QUANTITY,
} from "./constants";
import formatCurrency from "./utils/formatCurrency";

import "./App.css";
import FullReport from "./FullReport";

const { Sider, Content } = Layout;
const { Title, Paragraph, Link } = Typography;

export default function App() {
  const [showFullReport, setShowFullReport] = useState(false);
  const { topCompanies, topCompaniesLoading } = useTopCompanies(
    TOP_COMPANIES_QUANTITY
  );

  const { recentFundings, recentFundingsLoading } = useRecentFundings(
    RECENT_FUNDINGS_QUANTITY
  );

  const {
    setCurrentCompanyKey,
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
    setCurrentCompanyKey,
  });

  const dataSource = currentCompany?.fundings;

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
      sorter: (a, b) => {
        if (a.investment_type > b.investment_type) {
          return -1;
        }

        if (a.investment_type < b.investment_type) {
          return 1;
        }

        return 0;
      },
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

  const getCharData = (fundings) => {
    const fundingsTypes = [
      ...new Set(fundings.map(({ investment_type }) => investment_type)),
    ];

    return fundingsTypes
      .map((type) => {
        const amount = fundings
          .filter(({ investment_type }) => investment_type === type)
          .reduce((prev, cur) => prev + Number(cur.raised_amount_usd), 0);

        return { name: type, value: amount };
      })
      .filter(({ value }) => value !== 0);
  };

  const chartData = currentCompany?.fundings
    ? getCharData(currentCompany?.fundings)
    : [];

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
              <ShopOutlined /> Top companies
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
                      return (e) => {
                        setCurrentCompanyKey({ name, uuid });
                      };
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
              <DollarOutlined /> Latest fundings
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
                      return (e) => {
                        setCurrentCompanyKey({ name, uuid });
                      };
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
            {!showFullReport && !currentCompany && !currentCompanyLoading && (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty
                  image="/images/search.svg"
                  description="Choose or search a company to see the details or"
                />
                <Button
                  style={{ marginTop: 20 }}
                  type="primary"
                  onClick={() => setShowFullReport(true)}
                >
                  See the full report
                </Button>
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
                <Button style={{ marginBottom: 50 }} onClick={() => setCurrentCompanyKey(null)}>
                  <LeftOutlined />
                  Go back
                </Button>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <Logo
                    src={`//logo.clearbit.com/${currentCompany.org?.homepage_url}`}
                  />
                  <div style={{ marginLeft: 40 }}>
                    <Title level={2} style={{ marginBottom: 10 }}>
                      {currentCompany.org?.company_name}
                    </Title>
                    <Paragraph
                      style={{
                        marginBottom: 10,
                        maxWidth: "50em",
                      }}
                    >
                      {currentCompany.org?.short_description}
                    </Paragraph>
                    <div style={{ display: "flex" }}>
                      {currentCompany.org?.city && (
                        <Paragraph strong>
                          <ShopOutlined /> {currentCompany.org?.city},{" "}
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
                  </div>
                </div>
                {!!currentCompany.org?.description?.trim().length && (
                  <div style={{ marginTop: 40, maxWidth: "60em" }}>
                    <Title level={3} strong>
                      About
                    </Title>
                    <Paragraph className="text-clamp">
                      {currentCompany.org?.description}
                    </Paragraph>
                  </div>
                )}
                <div>
                  <div
                    style={{ display: "flex", gap: "0 60px", marginTop: 60 }}
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
                </div>
                {!!currentCompany.fundings?.length && (
                  <div className="table-container" style={{ marginTop: 50 }}>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ maxWidth: "60em" }}>
                          <Title level={4} strong>
                            Fundings
                          </Title>
                        </div>
                        <Table
                          style={{ width: 820 }}
                          dataSource={dataSource}
                          columns={columns}
                          pagination={{ pageSize: 5 }}
                        />
                      </div>
                      <PieChart width={500} height={300}>
                        <Pie
                          minAngle={10}
                          dataKey="value"
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          fill="#8884d8"
                          label={({ name, value }) =>
                            `${formatCurrency(value, true)} (${
                              TAG_NAMES[name] || name
                            })`
                          }
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={TAG_COLORS[entry.name] || "#64748B"}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!currentCompany && !currentCompanyLoading && showFullReport && (
              <FullReport />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
