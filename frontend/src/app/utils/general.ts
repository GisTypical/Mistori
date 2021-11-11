export const getDate = (date: Date | string) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString();
};
