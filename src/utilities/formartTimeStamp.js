export const formartTimeStamp = (timeStamp) => {
  const date = new Date(timeStamp);
  return date.toLocaleTimeString().slice(0, 5);
};
