import React from "react";
import PropTypes from "prop-types";

const DateFormat = ({ children }) => {
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return <>{new Date(children).toLocaleString("en-US", dateOptions)}</>;
};

DateFormat.propTypes = {
  children: PropTypes.string,
};

DateFormat.defaultProps = {
  children: Date.now(),
};

export default DateFormat;
