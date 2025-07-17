"use client";
import { dropdownData, taskData } from '../utils/constants';
import React, { useState, useRef, useEffect } from 'react';

export default function DropdownMenu({ value, onSubmit }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedData, setSelectedData] = useState("");

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            const match = taskData.find(item => item.title === value);
            if (match) setSelectedData(match);
        } else {
            setSelectedData("");
        }
    }, [value]);

    const handleSelect = (data) => {
        setSelectedData(data);
        onSubmit?.(data?.title);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block w-full text-left" ref={dropdownRef}>
            <button
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full text-black bg-gray-50 border border-gray-300 focus:outline-none font-medium rounded-lg text-[16px] px-5 py-2.5 text-left inline-flex items-center justify-between"
            >
                {selectedData ? selectedData?.title : "Select value"}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full rounded-lg shadow-sm border border-gray-200 bg-gray-100">
                    <ul
                        role="listbox"
                        className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto"
                    >
                        {dropdownData?.map((item, index) => (
                            <li key={index}>
                                <button
                                    role="option"
                                    onClick={() => handleSelect(item)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-150"
                                >
                                    {item.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
