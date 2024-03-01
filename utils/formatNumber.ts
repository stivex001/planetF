export const formatAmount = (value: string | number) => {
  const parsedValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(parsedValue)) return "0.00";
  return parsedValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
