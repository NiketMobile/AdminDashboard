import { FaHome, FaBars, FaBell } from 'react-icons/fa';
import { FaList, FaWpforms } from "react-icons/fa6";

export const listData = [
    {
        id: 1,
        text: 'Dashboard',
        icon: <FaHome />,
        active: true,
        alert: false,
        path: "dashboard",
    },
    {
        id: 2,
        text: 'Menu',
        icon: <FaBars />,
        active: false,
        alert: true,
        path: null,
        options: [
            {
                id: 11, text: 'Sub Menu 1',
                icon: <FaBars />,
                active: false,
                alert: false,
                path: "dashboard",
            },
            {
                id: 12,
                text: 'Sub Menu 2',
                icon: <FaBars />,
                active: false,
                alert: false,
                path: "dashboard",
            },
        ],
    },
    {
        id: 3,
        text: 'Products',
        icon: <FaBell />,
        active: false,
        alert: false,
        path: "products",
    },
    {
        id: 4,
        text: 'Lists',
        icon: <FaList />,
        active: false,
        alert: false,
        path: "lists",
    },
    {
        id: 5,
        text: 'Add Task',
        icon: <FaWpforms />,
        active: false,
        alert: false,
        path: "addtask",
    },
];


export const notesData = [
    {
        "id": "1",
        "title": "Grocery List",
        "content": "Buy milk, eggs, bread, and bananas.",
        "pinned": false,
        "archived": false
    },
    {
        "id": "2",
        "title": "Project Kickoff",
        "content": "Initial meeting scheduled with the new client. Prepare pitch deck.",
        "pinned": true,
        "archived": false
    },
    {
        "id": "3",
        "title": "Books to Read",
        "content": "Atomic Habits, Deep Work, The Alchemist, Sapiens.",
        "pinned": false,
        "archived": false
    },
    {
        "id": "4",
        "title": "Workout Routine",
        "content": "Monday - Chest, Tuesday - Back, Wednesday - Legs, Thursday - Cardio.",
        "pinned": false,
        "archived": false
    },
    {
        "id": "5",
        "title": "Weekly Goals",
        "content": "Finish UI for notes app, publish blog post, clean workspace.",
        "pinned": true,
        "archived": false
    },
    {
        "id": "6",
        "title": "Vacation Ideas",
        "content": "Japan in Spring, Maldives for beach, Iceland for Northern Lights.",
        "pinned": false,
        "archived": false
    },
    {
        "id": "7",
        "title": "Birthday Gift List",
        "content": "Watch, Headphones, Custom Mug, Gift Cards.",
        "pinned": false,
        "archived": true
    },
    {
        "id": "8",
        "title": "Learning Plan",
        "content": "React Native advanced, TypeScript, Node.js in 1 month schedule.",
        "createdAt": "2025-07-09T16:00:00Z",
        "updatedAt": "2025-07-09T16:40:00Z",
        "tags": ["learning", "dev"],
        "pinned": false,
        "archived": false
    },
    {
        "id": "9",
        "title": "Shopping for Party",
        "content": "Snacks, beverages, paper plates, balloons, lights. Snacks, beverages, paper plates, balloons, lights. Snacks, beverages, paper plates, balloons, lights.",
        "pinned": false,
        "archived": false
    }
]


export const taskData = [
    {
        id: "0",
        title: "All"
    },
    {
        id: "1",
        title: "React Native"
    },
    {
        id: "2",
        title: "React"
    },
    {
        id: "3",
        title: "Javascript"
    },
    {
        id: "4",
        title: "Node"
    },
]


export const listScreenHeaderData = [
    {
        id: "1",
        title: "Grocery Shopping List"
    },
    {
        id: "2",
        title: "Weekend Project Tasks"
    },
    {
        id: "3",
        title: "Birthday Party Preparations"
    },
    {
        id: "4",
        title: "Work Meeting Agenda"
    },
    {
        id: "5",
        title: "Books to Read This Year"
    },
    {
        id: "6",
        title: "Travel Bucket List"
    },
    {
        id: "7",
        title: "Home Improvement Ideas"
    },
    {
        id: "8",
        title: "Fitness Routine"
    },
    {
        id: "9",
        title: "Recipe Collection"
    },
    {
        id: "10",
        title: "Financial Goals"
    }
];

const imageurl = "https://fastly.picsum.photos/id/569/200/200.jpg?hmac=rzX0dRJRyZs2NIa_h_87CJVeoetRLtTlweCZmYrYlCA"

export const tableData = [
    {
        "name": "Apple MacBook Pro 17\"",
        "image": imageurl,
        "subtitle": "Powerhouse for professionals",
        "description": "A high-performance laptop with a Retina display, M-series chip, and all-day battery life.",
        "category": "React",
        "date": "2025-07-01",
        "url": "https://www.w3schools.com/html/html_tables.asphttps://www.w3schools.com/html/html_tables.asp"
    },
    {
        "name": "Microsoft Surface Pro",
        "image": imageurl,
        "subtitle": "Ultra-light and versatile",
        "description": "A 2-in-1 detachable tablet and laptop with a responsive touchscreen and powerful performance.",
        "category": "React Native",
        "date": "2025-06-28",
        "url": "https://www.google.com/"
    },
    {
        "name": "Magic Mouse 2",
        "image": imageurl,
        "subtitle": "Seamless navigation",
        "description": "A wireless, rechargeable mouse with a multi-touch surface for intuitive gestures.",
        "category": "Javascript",
        "date": "2025-07-10",
        "url": "https://www.google.com/"
    },
    {
        "name": "Google Pixel Phone",
        "image": imageurl,
        "subtitle": "Smartphone made by Google",
        "description": "A clean Android experience with cutting-edge camera technology and software updates.",
        "category": "Node",
        "date": "2025-06-25",
        "url": "https://www.google.com/"
    },
    {
        "name": "Apple Watch 5",
        "image": imageurl,
        "subtitle": "Your health companion",
        "description": "A smartwatch with health tracking, notifications, GPS, and an always-on display.",
        "category": "React Native",
        "date": "2025-07-05",
        "url": "https://www.google.com/"
    },
    {
        "name": "Microsoft Surface Pro",
        "image": imageurl,
        "subtitle": "Ultra-light and versatile",
        "description": "A 2-in-1 detachable tablet and laptop with a responsive touchscreen and powerful performance.",
        "category": "React Native",
        "date": "2025-06-28",
        "url": "https://www.google.com/"
    },
    {
        "name": "Magic Mouse 2",
        "image": imageurl,
        "subtitle": "Seamless navigation",
        "description": "A wireless, rechargeable mouse with a multi-touch surface for intuitive gestures.",
        "category": "Javascript",
        "date": "2025-07-10",
        "url": "https://www.google.com/"
    },
    {
        "name": "Google Pixel Phone",
        "image": imageurl,
        "subtitle": "Smartphone made by Google",
        "description": "A clean Android experience with cutting-edge camera technology and software updates.",
        "category": "Node",
        "date": "2025-06-25",
        "url": "https://www.google.com/"
    },
    {
        "name": "Apple Watch 5",
        "image": imageurl,
        "subtitle": "Your health companion",
        "description": "A smartwatch with health tracking, notifications, GPS, and an always-on display.",
        "category": "React Native",
        "date": "2025-07-05",
        "url": "https://www.google.com/"
    },
    {
        "name": "Microsoft Surface Pro",
        "image": imageurl,
        "subtitle": "Ultra-light and versatile",
        "description": "A 2-in-1 detachable tablet and laptop with a responsive touchscreen and powerful performance.",
        "category": "React Native",
        "date": "2025-06-28",
        "url": "https://www.google.com/"
    },
    {
        "name": "Magic Mouse 2",
        "image": imageurl,
        "subtitle": "Seamless navigation",
        "description": "A wireless, rechargeable mouse with a multi-touch surface for intuitive gestures.",
        "category": "Javascript",
        "date": "2025-07-10",
        "url": "https://www.google.com/"
    },
    {
        "name": "Google Pixel Phone",
        "image": imageurl,
        "subtitle": "Smartphone made by Google",
        "description": "A clean Android experience with cutting-edge camera technology and software updates.",
        "category": "Node",
        "date": "2025-06-25",
        "url": "https://www.google.com/"
    },
    {
        "name": "Apple Watch 5",
        "image": imageurl,
        "subtitle": "Your health companion",
        "description": "A smartwatch with health tracking, notifications, GPS, and an always-on display.",
        "category": "React Native",
        "date": "2025-07-05",
        "url": "https://www.google.com/"
    },
    {
        "name": "Microsoft Surface Pro",
        "image": imageurl,
        "subtitle": "Ultra-light and versatile",
        "description": "A 2-in-1 detachable tablet and laptop with a responsive touchscreen and powerful performance.",
        "category": "React Native",
        "date": "2025-06-28",
        "url": "https://www.google.com/"
    },
    {
        "name": "Magic Mouse 2",
        "image": imageurl,
        "subtitle": "Seamless navigation",
        "description": "A wireless, rechargeable mouse with a multi-touch surface for intuitive gestures.",
        "category": "Javascript",
        "date": "2025-07-10",
        "url": "https://www.google.com/"
    },
    {
        "name": "Google Pixel Phone",
        "image": imageurl,
        "subtitle": "Smartphone made by Google",
        "description": "A clean Android experience with cutting-edge camera technology and software updates.",
        "category": "Node",
        "date": "2025-06-25",
        "url": "https://www.google.com/"
    },
    {
        "name": "Apple Watch 5",
        "image": imageurl,
        "subtitle": "Your health companion",
        "description": "A smartwatch with health tracking, notifications, GPS, and an always-on display.",
        "category": "React Native",
        "date": "2025-07-05",
        "url": "https://www.google.com/"
    },
]


