const formatCurrency = (currency, isShort) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: isShort ? 1 : 0,
    notation: isShort ? "compact" : "standard",
  });

  return formatter.format(currency);
};

export default formatCurrency;
