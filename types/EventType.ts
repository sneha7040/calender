export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO format date string
  startTime: string; // e.g., "10:00 AM"
  endTime: string;   // e.g., "11:00 AM"
}
