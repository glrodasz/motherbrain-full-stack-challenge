const formatDate = (date, { isShort } = {}) => {
  const dateOptions = {
    day: "numeric",
    month: isShort ? "short" : "long",
    year: "numeric",
  };

  return new Date(date).toLocaleString("en-US", dateOptions);
};

export default formatDate;
