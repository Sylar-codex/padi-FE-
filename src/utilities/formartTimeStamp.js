import dayjs from "dayjs";

let isToday = require("dayjs/plugin/isToday");
let isYesterday = require("dayjs/plugin/isYesterday");
let isBetween = require("dayjs/plugin/isBetween");

dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(isYesterday);

export const formartTimeStamp = (timeStamp) => {
  const date = dayjs(timeStamp);
  const today = dayjs();

  if (date.isToday()) {
    return date.format("HH:mm");
  } else if (date.isYesterday()) {
    return "yesterday " + date.format("HH:mm");
  } else if (date.isBetween(today.startOf("week"), today.endOf("week"))) {
    return date.format("dddd") + " " + date.format("HH:mm");
  } else {
    return date.format("DD/MM/YYYY HH:mm");
  }
};
