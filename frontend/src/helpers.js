const getFundingRoundsAmountByType = (fundingRounds, type) =>
  fundingRounds
    .filter(({ investment_type }) => investment_type === type)
    .reduce((prev, cur) => prev + Number(cur.raised_amount_usd), 0);

export const mapCompanyFundingRoundsToPieChartData = (fundingRounds = []) => {
  const types = [
    ...new Set(fundingRounds.map(({ investment_type }) => investment_type)),
  ];

  return types
    .map((type) => ({
      name: type,
      value: getFundingRoundsAmountByType(fundingRounds, type),
    }))
    .filter(({ value }) => value !== 0);
};
