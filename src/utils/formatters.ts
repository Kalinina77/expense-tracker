export const formatAmount = (amount: number): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};