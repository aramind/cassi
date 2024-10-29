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
