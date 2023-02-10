import React from "react";

import { Tag } from "antd";

import { getFundingRoundColor } from "../../helpers";

const Investment = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Tag color={getFundingRoundColor(children)}>
      {children.toUpperCase().replaceAll("_", " ")}
    </Tag>
  );
};

Investment.defaultProps = {
  children: "",
};

export default Investment;
