export const getCurrentDate = new Date().toLocaleDateString("en-PH", {
  timeZone: "Asia/Manila",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const getCurrentDay = new Date().toLocaleString("en-PH", {
  timeZone: "Asia/Manila",
  weekday: "long",
});

// converts date in format mm/dd/yyyy to ISO format compatible with mongoDB (YYYY-MM-DDTHH:mm:ss.sssZ)
export const convertToISOFormat = (dateString) => {
  const [month, day, year] = dateString.split("/");

  const date = new Date(`${year}-${month}-${day}`);

  console.log(date.toISOString());
  return date.toISOString();
};
