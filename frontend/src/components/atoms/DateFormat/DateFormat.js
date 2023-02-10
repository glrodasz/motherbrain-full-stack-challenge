import React from "react";

import formatDate from "../../../utils/formatDate";

const DateFormat = ({ children }) => <>{formatDate(children)}</>;

DateFormat.defaultProps = {
  children: Date.now(),
};

export default DateFormat;
