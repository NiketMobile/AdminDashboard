"use client";
import React, { useRef, useEffect } from 'react';

export default function Textarea({ value, onChange }) {
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        onChange(e.target.value); // propagate value to parent

        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
    };

    // Ensure height adjusts even when `value` changes from outside
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            rows={1}
            className="bg-gray-50 border min-h-[240px] border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700 overflow-hidden resize-none"
            placeholder="Type something..."
        />
    );
}
