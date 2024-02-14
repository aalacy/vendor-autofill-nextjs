import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

export const GoogleCalendar = () => {
  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey=""
        events={{
          googleCalendarId: "aaronlacywhite387@gmail.com",
        }}
      />
    </div>
  );
};
