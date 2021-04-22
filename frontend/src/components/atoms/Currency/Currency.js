import React from "react";

import formatCurrency from "../../../utils/formatCurrency";

const Currency = ({ children }) => {
  return <>{formatCurrency(children)}</>;
};

Currency.defaultProps = {
  children: 0,
};

export default Currency;
