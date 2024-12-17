import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface EventData {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
}

const CalendarPage = () => {
  const [events, setEvents] = useState<EventData[]>([]); // Ensure events is typed as an array of EventData
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<EventData>>({}); // currentEvent is typed as Partial<EventData>
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDateClick = (info: any) => {
    // Reset form
    setCurrentEvent({ start: info.dateStr, end: info.dateStr });
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleEventClick = (info: any) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setCurrentEvent({ ...event });
      setEditingId(event.id);
      setDialogOpen(true);
    }
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.start || !currentEvent.end) return;

    if (editingId) {
      setEvents(
        events.map((e) =>
          e.id === editingId ? { ...e, ...currentEvent } : e
        )
      );
    } else {
      setEvents([ ...events, { ...currentEvent, id: Date.now().toString() } as EventData ]);
    }

    setDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    if (editingId) {
      setEvents(events.filter((e) => e.id !== editingId));
      setDialogOpen(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable
        selectable
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {/* Event Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div
          style={{
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            sx={{ width: "350px" }}
            label="Event Name"
            value={currentEvent.title || ""}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, title: e.target.value })
            }
          />
          <TextField
            sx={{ width: "350px" }}
            type="datetime-local"
            label="Start"
            value={currentEvent.start || ""}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, start: e.target.value })
            }
          />
          <TextField
            sx={{ width: "350px" }}
            type="datetime-local"
            label="End"
            value={currentEvent.end || ""}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, end: e.target.value })
            }
          />
          <InputLabel>Color</InputLabel>
          <Select
            value={currentEvent.color || ""}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, color: e.target.value })
            }
          >
            <MenuItem value="#FF5733">Red</MenuItem>
            <MenuItem value="#33FF57">Green</MenuItem>
            <MenuItem value="#3357FF">Blue</MenuItem>
          </Select>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEvent}
            >
              Save
            </Button>
            {editingId && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteEvent}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
