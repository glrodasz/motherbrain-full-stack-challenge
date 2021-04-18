import React from "react";
import PropTypes from "prop-types";

import formatCurrency from "../../../utils/formatCurrency";

const Currency = ({ children }) => {
  return <>{formatCurrency(children)}</>;
};

Currency.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Currency.defaultProps = {
  children: 0,
};

export default Currency;
