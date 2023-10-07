export const getMonthName = (date: Date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return monthNames[date.getMonth()];
};

export const getCustomDate = (date: Date) => {
  const month = getMonthName(date);
  const day = date.getDate();

  return `${month} ${day}`;
};
