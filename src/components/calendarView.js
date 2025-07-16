"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useModal } from "@/hooks/useModal";
import Modal from "./modal";

const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("personal");
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Event Conf.",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { calendar: "Danger" },
      },
      {
        id: "2",
        title: "Meeting",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { calendar: "Success" },
      },
    ]);
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null);
    setEventTitle("");
    setEventLevel("personal");
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps.calendar.toLowerCase());
    openModal();
  };

  const handleAddOrUpdateEvent = (data) => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
              ...event,
              title: data.eventTitle,
              start: data.eventStartDate,
              end: data.eventEndDate,
              extendedProps: { calendar: data.eventLevel },
            }
            : event
        )
      );
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title: data.eventTitle,
        start: data.eventStartDate,
        end: data.eventEndDate,
        allDay: true,
        extendedProps: { calendar: data.eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
  };


  // #f2f4f7

  return (
    <div className="container mx-auto my-10  bg-white">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next addEventButton",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        customButtons={{
          addEventButton: {
            text: "Add Event +",
            click: () => {
              setSelectedEvent(null);
              setEventTitle("");
              setEventLevel("personal");
              setEventStartDate("");
              setEventEndDate("");
              openModal();
            },
          },
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        selectedEvent={selectedEvent}
        initialEventTitle={eventTitle}
        initialEventLevel={eventLevel}
        initialEventStartDate={eventStartDate}
        initialEventEndDate={eventEndDate}
        handleAddOrUpdateEvent={handleAddOrUpdateEvent}
        className="max-w-[700px] p-6 lg:p-10"
      />
    </div>
  );
};

const renderEventContent = (eventInfo) => {
  const color = eventInfo.event.extendedProps.calendar?.toLowerCase() || "gray";
  return (
    <div className={`flex items-center gap-2 text-sm`}>
      <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
      <span>{eventInfo.event.title}</span>
    </div>
  );
};

export default CalendarView;
