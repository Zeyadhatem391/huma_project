
export const START_HOUR = 8;
export const END_HOUR = 18;
export const HOUR_HEIGHT = 90;

export const timeSlots = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => i + START_HOUR,
);

export function getMeetingPosition(start: string, end: string) {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    const top =
        ((startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;

    const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;

    return { top, height };
}

export function formatTime(time: string) {
    const [hour, minute] = time.split(":").map(Number);

    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${String(minute).padStart(2, "0")} ${period}`;
}
