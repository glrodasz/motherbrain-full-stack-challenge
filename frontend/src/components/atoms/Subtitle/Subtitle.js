import React from "react";
import { Typography } from "antd";

const Subtitle = ({ children }) => {
  return (
    <Typography.Title
      level={5}
      type="secondary"
      style={{ textTransform: "uppercase" }}
    >
      {children}
    </Typography.Title>
  );
};

export default Subtitle;
