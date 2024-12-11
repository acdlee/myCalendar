import { generateSimpleId } from "./../src/util/util.js";

const data = [
    {
      day: "Sunday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Go to pet store",
          text: "Get pet supplies.",
        }
      ]
    },
    {
      day: "Monday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Go to movies",
          text: "Go see a cool movie.",
        }
      ]
    },  {
      day: "Tuesday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Go to lunch",
          text: "Go have lunch with a friend.",
        }
      ]
    },  {
      day: "Wednesday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Sleep in",
          text: "Make sure to sleep in this day.",
        }
      ]
    },  {
      day: "Thursday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Repair car",
          text: "Go to car repair shop.",
        }
      ]
    },  {
      day: "Friday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Pay bills",
          text: "Make sure you pay bills today.",
        }
      ]
    },  {
      day: "Saturday",
      tasks: [
        {
          id: generateSimpleId(),
          title: "Day off",
          text: "Today is your day off.",
        }
      ]
    },
];

const size = new TextEncoder().encode(JSON.stringify(data)).length;
const kiloBytes = size / 1024;
const megaBytes = kiloBytes / 1024;
console.log(`${megaBytes}`);