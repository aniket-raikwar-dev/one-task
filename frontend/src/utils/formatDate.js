export const formatDate = (date = "") => {
  const [year, month, day] = date?.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
};
