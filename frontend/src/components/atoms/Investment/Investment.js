import React from "react";
import PropTypes from "prop-types";

import { Tag } from "antd";

import { TAG_COLORS } from '../../../constants'

const Investment = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Tag color={TAG_COLORS[children] || "#64748B"}>
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
