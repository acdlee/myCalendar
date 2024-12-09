function generateTodayString() {
    const d = new Date();
    console.log(`${days[d.getDay()]}`);
    return days[d.getDay()];
}

function sortDays(dayA, dayB) {
    let a = '', b = '';
  
    // Edge case: generate day name for "Today" dayName data
    (dayA.dayName === "Today") ? a = days.indexOf(generateTodayString()) : a = days.indexOf(dayA.dayName);
    (dayB.dayName === "Today") ? b = days.indexOf(generateTodayString()) : b = days.indexOf(dayB.dayName);
  
    console.log(a, b);
  
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const data = [{dayName: "Today"}, {dayName: "Tuesday"}, {dayName: "Wednesday"}, {dayName: "Thursday"}, {dayName: "Friday"}, {dayName: "Saturday"}, {dayName: "Sunday"}];

console.log(`${JSON.stringify(data.sort(sortDays))}`);