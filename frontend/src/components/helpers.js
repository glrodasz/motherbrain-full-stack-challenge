import formatCurrency from "../utils/formatCurrency";

import {
  DEFAULT_FUNDING_ROUND_COLOR,
  FUNDING_ROUNDS_NAMES,
  FUNDING_ROUNDS_COLORS,
} from "../constants";

export const getFundingRoundLabel = ({ name, value }) =>
  `${formatCurrency(value, { isShort: true })} (${
    FUNDING_ROUNDS_NAMES[name] || name
  })`;

export const getFundingRoundColor = (name) =>
  FUNDING_ROUNDS_COLORS[name] || DEFAULT_FUNDING_ROUND_COLOR;
