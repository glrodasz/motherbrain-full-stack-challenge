import React from "react";

import { Empty } from "antd";

const NoCompanyInfo = () => {
  return (
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
  );
};

export default NoCompanyInfo;
