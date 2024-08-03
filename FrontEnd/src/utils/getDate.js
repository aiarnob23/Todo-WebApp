//get formatted date
export const getDate = (value) => {
  const date = value.getDate();
  const month = value.getMonth() + 1;
  const year = value.getFullYear();
  return `${date}-${month}-${year}`;
};
