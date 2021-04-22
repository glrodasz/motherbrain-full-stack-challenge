import React, { useState } from "react";
import { ShopOutlined, DollarOutlined, LeftOutlined } from "@ant-design/icons";
import { Layout, Typography, Space, Skeleton, Empty, Button } from "antd";

import Currency from "./components/atoms/Currency";
import FundingRoundsPieChart from "./components/molecules/FundingRoundsPieChart";
import FundingsRoundsReport from "./components/organisms/FundingRoundsReport";
import SearchBar from "./components/organisms/SearchBar/SearchBar";

import useTopCompanies from "./hooks/useTopCompanies";
import useRecentFundings from "./hooks/useTopFundings";
import useCurrentCompany from "./hooks/useCurrentCompany";

import Subtitle from "./components/atoms/Subtitle";
import SideCard from "./components/organisms/SideCard";
import EmptyState from "./components/molecules/EmptyState";
import NoCompanyInfo from "./components/molecules/NoCompanyInfo";
import CompanyHeader from "./components/molecules/CompanyHeader";
import CompanyInfo from "./components/molecules/CompanyInfo";

import { TOP_COMPANIES_QUANTITY, RECENT_FUNDINGS_QUANTITY } from "./constants";

import "./App.css";

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

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider
        theme="light"
        width={350}
        style={{
          backgroundColor: "#F1F5F9",
          boxShadow:
            "inset 0 4px 6px -1px rgba(0,0,0,0.1), inset 0 2px 4px -1px rgba(0,0,0,0.06)",
        }}
      >
        <SearchBar setCurrentCompanyKey={setCurrentCompanyKey} />
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
            <Subtitle>
              <ShopOutlined /> Top companies
            </Subtitle>
            {topCompaniesLoading &&
              [...Array(TOP_COMPANIES_QUANTITY)].map((n, index) => (
                <Skeleton key={index} active />
              ))}
            {!topCompaniesLoading && (
              <Space size="middle" direction="vertical">
                {topCompanies.map((org) => (
                  <SideCard
                    {...org}
                    setCurrentCompanyKey={setCurrentCompanyKey}
                  />
                ))}
              </Space>
            )}
          </div>
          <div style={{ padding: "0 20px", marginTop: "30px" }}>
            <Subtitle>
              <DollarOutlined /> Latest fundings
            </Subtitle>
            {recentFundingsLoading &&
              [...Array(RECENT_FUNDINGS_QUANTITY)].map((n, index) => (
                <Skeleton key={index} active />
              ))}
            {!recentFundingsLoading && (
              <Space size="middle" direction="vertical">
                {recentFundings.map((funding) => (
                  <SideCard
                    {...funding}
                    setCurrentCompanyKey={setCurrentCompanyKey}
                  />
                ))}
              </Space>
            )}
          </div>
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ backgroundColor: "#fff" }}>
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
              <EmptyState setShowFullReport={setShowFullReport} />
            )}
            {currentCompany &&
              currentCompany?.org?.company_name == null &&
              !currentCompanyLoading && <NoCompanyInfo />}
            {currentCompany?.org?.company_name && !currentCompanyLoading && (
              <div>
                <Button
                  style={{ marginBottom: 50 }}
                  onClick={() => setCurrentCompanyKey(null)}
                >
                  <LeftOutlined />
                  Go back
                </Button>
                <CompanyHeader currentCompany={currentCompany} />
                <CompanyInfo currentCompany={currentCompany} />
              </div>
            )}
            {showFullReport && (
              <FundingsRoundsReport
                hideReport={currentCompanyLoading || currentCompany}
                setCurrentCompanyKey={setCurrentCompanyKey}
              />
            )}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
