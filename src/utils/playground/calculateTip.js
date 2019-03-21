const calculateTip =
(totalValue, tipPercent = 0.5) => (totalValue * tipPercent) + totalValue;

module.exports = { calculateTip };
