export const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

export interface Meeting {
    id: number;
    title: string;
    day: number;
    start: string;
    end: string;
    attendees: number;
}

export const meetings: Meeting[] = [
    {
        id: 1,
        title: "Team Meeting",
        day: 0,
        start: "09:00",
        end: "10:30",
        attendees: 5,
    },
    {
        id: 2,
        title: "Project Discussion",
        day: 1,
        start: "11:00",
        end: "12:00",
        attendees: 4,
    },
    {
        id: 3,
        title: "UI Review",
        day: 2,
        start: "10:00",
        end: "11:30",
        attendees: 3,
    },
    {
        id: 4,
        title: "Backend Meeting",
        day: 3,
        start: "13:00",
        end: "14:00",
        attendees: 6,
    },
    {
        id: 5,
        title: "Weekly Planning",
        day: 5,
        start: "09:30",
        end: "11:00",
        attendees: 5,
    },
];