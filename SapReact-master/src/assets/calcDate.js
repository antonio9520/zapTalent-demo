export function calcDate(date1, date2) {
  let num2 = new Date(date2);
  var diff = Math.floor(date1 - num2);
  var day = 1000 * 60 * 60 * 24;

  var days = Math.floor(diff / day);
  var months = Math.floor(days / 31);
  var years = Math.floor(months / 12);

  let data = { years: years, months: months, days: days };

  return data;
}
