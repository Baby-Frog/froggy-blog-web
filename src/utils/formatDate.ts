export const getMonthName = (date: Date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return monthNames[date.getMonth()];
};

export const getFullMonthName = (date: Date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[date.getMonth()];
};

export const getCustomDate = (date: Date) => {
  const month = getMonthName(date);
  const day = date.getDate();
  const year = date.getFullYear() === new Date().getFullYear() ? "" : date.getFullYear();
  return `${month} ${day} ${year}`;
};

export const getCustomDateByString = (date: string) => {
  const newDate = new Date(date);
  const month = getFullMonthName(newDate);
  const day = newDate.getDate();
  return `${month} ${day} `;
};

export const getDateTime = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};
