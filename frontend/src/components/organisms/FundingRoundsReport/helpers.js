export const mapFundingRoundsToPieChartData = ({
  name,
  ...fundingRoundsPayload
}) =>
  Object.keys(fundingRoundsPayload).map((key) => ({
    name: key,
    value: fundingRoundsPayload[key],
  }));
