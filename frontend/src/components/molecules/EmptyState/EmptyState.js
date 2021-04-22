import React from "react";

import { Button, Empty } from "antd";

const EmptyState = ({ setShowFullReport }) => {
  return (
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
  );
};

export default EmptyState;
