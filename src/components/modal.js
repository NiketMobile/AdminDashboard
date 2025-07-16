"use client";
import React, { useEffect, useRef, useState } from "react";

const Modal = ({
    isOpen,
    onClose,
    handleAddOrUpdateEvent,
    className,
    showCloseButton = true,
    isFullscreen = false,
    selectedEvent,
    initialEventTitle,
    initialEventLevel,
    initialEventStartDate,
    initialEventEndDate,
}) => {
    const modalRef = useRef(null);

    const [eventTitle, setEventTitle] = useState(initialEventTitle || "");
    const [eventLevel, setEventLevel] = useState(initialEventLevel || "personal");
    const [eventStartDate, setEventStartDate] = useState(initialEventStartDate || "");
    const [eventEndDate, setEventEndDate] = useState(initialEventEndDate || "");

    useEffect(() => {
        if (isOpen) {
            setEventTitle(initialEventTitle || "");
            setEventLevel(initialEventLevel || "personal");
            setEventStartDate(initialEventStartDate || "");
            setEventEndDate(initialEventEndDate || "");
        }
    }, [isOpen, initialEventTitle, initialEventLevel, initialEventStartDate, initialEventEndDate]);

    const calendarsEvents = {
        personal: "primary",
        work: "success",
        family: "info",
        others: "warning",
    };

    const handleAddOrUpdateEvents = () => {
        handleAddOrUpdateEvent({
            eventTitle,
            eventLevel,
            eventStartDate,
            eventEndDate,
        });
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center z-[99999]">
            {!isFullscreen && (
                <div
                    className=""
                    onClick={onClose}
                />
            )}
            <div
                ref={modalRef}
                className={`bg-gray-200  ${isFullscreen ? "w-full h-full" : "max-w-xl w-full rounded-xl p-6"} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {showCloseButton && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black ">
                        ✕
                    </button>
                )}
                <h2 className="text-xl font-semibold mb-4">{selectedEvent ? "Edit Event" : "Add Event"}</h2>
                <div className="space-y-4">
                    <div>
                        <label>Event Title</label>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10"
                        />
                    </div>
                    <div>
                        <label>Event Color</label>
                        <div className="flex gap-4 mt-2">
                            {Object.entries(calendarsEvents).map(([key]) => (
                                <label key={key} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="event-level"
                                        value={key}
                                        checked={eventLevel === key}
                                        onChange={() => setEventLevel(key)}
                                    />
                                    {key}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={eventStartDate}
                            onChange={(e) => setEventStartDate(e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10"

                        />
                    </div>
                    <div>
                        <label>End Date</label>
                        <input
                            type="date"
                            value={eventEndDate}
                            onChange={(e) => setEventEndDate(e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10"

                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={onClose} className="mouseover-hover cursor-pointer border px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button
                            onClick={handleAddOrUpdateEvents}
                            className="mouseover-hover cursor-pointer bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {selectedEvent ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
