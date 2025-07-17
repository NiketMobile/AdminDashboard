"use client"
import { tableData, taskData } from '../../../utils/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import { TbSortAscending } from "react-icons/tb";
import { HiSortDescending } from "react-icons/hi";

export default function page() {
    const [isSelected, setisSelected] = useState("")

    const formateDate = (date) => {
        const parsedDate = new Date(date);
        const localeDate = parsedDate.toLocaleDateString("en-GB");
        return localeDate
    }



    return (
        <div className=''>
            <div className='bg-white w-full max-h-screen p-5 border border-gray-300 rounded-[10px]'>
                <h1 className='text-[20px] pb-3 text-brand-950 font-bold'>Recent Lists</h1>

                <div className="flex flex-col md:flex-col lg:flex-row items-start lg:items-center justify-between gap-5">

                    <div className="flex flex-row px-2 py-1 bg-gray-100 rounded-[7px]">
                        {taskData.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setisSelected(item.id)}
                                className={`mouse-hover cursor-pointer flex items-center px-6 py-2 rounded-md text-left ${isSelected === item.id ? 'bg-white' : ''
                                    }`}>
                                <p className={`text-[15px] font-medium ${isSelected == item.id ? 'text-black' : 'text-gray-600'}`}>{item.title}</p>
                            </button>
                        ))}
                    </div>
                    <div className='flex items-center justify-between flex-row gap-5'>
                        <button className='hover:bg-blue-600 mouse-hover cursor-pointer bg-brand-700 py-2 px-10 border border-gray-500 rounded-[5px]'>
                            <TbSortAscending className='text-white' size={27} />
                        </button>
                        <button className='hover:bg-blue-600 mouse-hover cursor-pointer bg-brand-700 py-2 px-10 border border-gray-500 rounded-[5px]'>
                            <HiSortDescending className='text-white' size={27} />
                        </button>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className="relative overflow-x-auto max-h-[calc(100vh-250px)] overflow-y-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Url</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white even:bg-gray-50 border-b  border-gray-200" >
                                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap ">
                                            <div className="flex flex-col md:flex-row md:justify-around lg:justify-start items-center gap-3 md:gap-5">
                                                <Image src={item.image} width={65} height={65} alt="Picture of the author" className='mr-5 rounded-[5px]' />
                                                <div className='flex flex-col'>
                                                    <span className="font-bold text-sm text-gray-800">{item.name}</span>
                                                    {/* <span className="text-xs text-gray-500">{item.subtitle}</span> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-[150px] xl:max-w-[250px] break-words">
                                            <div className="flex flex-col">
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors truncate"
                                                    title={item.url}>
                                                    {item.url}
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 max-w-[350px] xl:max-w-[400px] break-words">{item.description}</td>
                                        <td className="px-6 py-6">{item.category}</td>
                                        <td className="px-6 py-6">{formateDate(item.date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
