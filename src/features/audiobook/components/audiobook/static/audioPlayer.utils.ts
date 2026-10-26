import { TimerOption } from "./audiobook.type";

export const timerOptions: TimerOption[] = [
  { label: "No Timer", value: 0, isStop: true },
  { label: "5 min", value: 5 },
  { label: "10 min", value: 10 },
  { label: "20 min", value: 20 },
  { label: "30 min", value: 30 },
  { label: "40 min", value: 40 },
  { label: "50 min", value: 50 },
];

export const speedOption = [
    { label: "0.50", value: 0.50, isStop: true },
  { label: "0.75", value: 0.75 },
  { label: "1.00", value: 1 },
  { label: "1.25", value: 1.25 },
  { label: "1.50", value: 1.50 },
  { label: "1.75", value: 1.75 },
  { label: "2.00", value: 2 },
];