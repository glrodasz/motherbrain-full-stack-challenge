import React from "react";
import PropTypes from "prop-types";

import { Tag } from "antd";

const tagColor = {
  seed: "#10B981",
  series_a: "#0EA5E9",
  series_b: "#6366F1",
  series_c: "#8B5CF6",
  series_d: "#EC4899",
  series_e: "#F59E0B",
};

const Investment = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Tag color={tagColor[children] || "#64748B"}>
      {children.toUpperCase().replaceAll("_", " ")}
    </Tag>
  );
};

Investment.propTypes = {
  children: PropTypes.string,
};

Investment.defaultProps = {
  children: "",
};

export default Investment;
