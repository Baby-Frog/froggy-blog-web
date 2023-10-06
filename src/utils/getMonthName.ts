// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMonthName = (date: any) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return monthNames[date.getMonth()];
};
