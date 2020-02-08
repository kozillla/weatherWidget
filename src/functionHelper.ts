const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

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
  "December"
];

export function findDayName(day: number) {
  if (day < 0 || day > 6) {
    return undefined;
  }
  return dayNames[day];
}

export function findMonthName(month: number) {
  if (month < 0 || month > 11) {
    return undefined;
  }
  return monthNames[month];
}

export function formatDay(day: number) {
  if (day === 1) {
    return `${day}st`;
  } else if (day === 2) {
    return `${day}nd`;
  } else if (day === 3) {
    return `${day}rd`;
  } else {
    return `${day}th`;
  }
}

// convert celcius degrees into clecius(type 1)/farenthite(type 2)
export function formatTemp(type: number, degrees: number) {
  if (type === 1) {
    return Math.floor(degrees);
  }
  if (type === 2) {
    return Math.floor(degrees * (9 / 5) + 32);
  }
  return undefined;
}
