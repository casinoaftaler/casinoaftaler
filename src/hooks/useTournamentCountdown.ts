import { useState, useEffect } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
}

function getNextMonthStart(): Date {
  // Calculate next month's 1st at 00:00 Danish time
  const now = new Date();
  // Get current date in Copenhagen timezone
  const cph = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(now);

  const parts: Record<string, number> = {};
  for (const p of cph) {
    if (p.type !== "literal") parts[p.type] = parseInt(p.value, 10);
  }

  // Next month 1st in Copenhagen
  let year = parts.year;
  let month = parts.month + 1;
  if (month > 12) {
    month = 1;
    year++;
  }

  // Create a date string for the target in Copenhagen timezone
  // We use a trick: construct the date and convert back to UTC
  const targetLocal = new Date(`${year}-${String(month).padStart(2, "0")}-01T00:00:00`);
  
  // Get the UTC offset for Copenhagen at that date
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Copenhagen",
    timeZoneName: "shortOffset",
  });
  const formatted = formatter.format(targetLocal);
  const offsetMatch = formatted.match(/GMT([+-]\d+)/);
  const offsetHours = offsetMatch ? parseInt(offsetMatch[1], 10) : 1;
  
  // Target in UTC
  const target = new Date(Date.UTC(year, month - 1, 1, -offsetHours, 0, 0));
  return target;
}

export function useTournamentCountdown(): CountdownValues {
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    label: "",
  });

  useEffect(() => {
    function update() {
      const target = getNextMonthStart();
      const diff = Math.max(0, target.getTime() - Date.now());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const parts: string[] = [];
      if (days > 0) parts.push(`${days}d`);
      parts.push(`${hours}t`);
      parts.push(`${minutes}m`);
      if (days === 0) parts.push(`${seconds}s`);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        label: parts.join(" "),
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
