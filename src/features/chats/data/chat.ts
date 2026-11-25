export const conversations = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    message: "Hey, how is the project going?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Mohamed Ali",
    message: "I have finished the dashboard design.",
    time: "09:45 AM",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Omar Hassan",
    message: "Can you review my changes?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Sara Ahmed",
    message: "Thanks for your help!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

export const initialMessages = [
  {
    id: 1,
    text: "Hey! How is the project going?",
    time: "10:25 AM",
    sender: "other" as const,
  },
  {
    id: 2,
    text: "It's going great! We have finished most of the dashboard UI.",
    time: "10:27 AM",
    sender: "me" as const,
  },
  {
    id: 3,
    text: "That's awesome! What about the backend integration?",
    time: "10:28 AM",
    sender: "other" as const,
  },
  {
    id: 4,
    text: "We are working on it now. Should be ready soon.",
    time: "10:30 AM",
    sender: "me" as const,
  },
];