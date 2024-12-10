const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Helper function to generate unique task ids
function generateSimpleId() {
    let id = Math.random().toString(36).substr(2, 9); // Generates a 9-character alphanumeric string
    return id
}

// Helper function to generate week strings based off current
function generateWeekStrings() {
    const curr = new Date;
    const month = curr.getMonth() + 1;
    const year = curr.getFullYear();
    const first = curr.getDate() - curr.getDay();
    const last = first + 6;
  
    const first_f = month + '/' + first + '/' + year;
    const last_f = month + '/' + last + '/' + year;
  
    return [first_f, last_f];
}

// Helper function to get the name of the current day
function generateTodayString() {
    const d = new Date();
    return days[d.getDay()];
}

// Helper function to validate location (of the form Lat,Long)
function validateLocation(locationString) {
    const pattern = /-?\d+\.*\d*,-?\d+\.*\d*/;
    return pattern.test(locationString);
}

// Helper function defining a custom sort based off day names
function sortDays(dayA, dayB) {
    let a = '', b = '';
  
    // Edge case: generate day name for string not found in 'days'
    (!days.includes(dayA.dayName)) ? a = days.indexOf(generateTodayString()) : a = days.indexOf(dayA.dayName);
    (!days.includes(dayB.dayName)) ? b = days.indexOf(generateTodayString()) : b = days.indexOf(dayB.dayName);
  
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

export { 
    generateSimpleId, 
    generateWeekStrings, 
    generateTodayString,
    validateLocation,
    sortDays,
}