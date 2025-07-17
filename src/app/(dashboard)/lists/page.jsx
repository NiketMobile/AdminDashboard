"use client"
import { tableData, taskData } from '../../../utils/constants'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TbSortAscending } from "react-icons/tb";
import { HiSortDescending } from "react-icons/hi";
import { supabase } from '../../../supabase/supabase';
import moment from 'moment';
import showToast from '../../../components/showMessage';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { placeListParams } from '../../../redux/reducers/pagesReducer';


export default function page() {
    const [isSelected, setisSelected] = useState("")
    const [listData, setListData] = useState([])
    const [isSelectedData, setisSelectedData] = useState({})
    const dispatch = useDispatch()
    const router = useRouter();


    const formateDate = (date) => {
        return moment(date).format('MM - DD - YY');
    }

    const getData = useCallback(async () => {
        let { data: bookmarks, error } = await supabase
            .from('bookmarks')
            .select('*')
        setListData(bookmarks)
    }, [])

    useEffect(() => {
        getData()
        setisSelected({
            id: "0",
            title: "All"
        })
    }, [getData])

    const bookmarkData = useMemo(() => {
        if (!listData || listData?.length == 0) return [];
        const sortedData = [...listData]?.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at) // newest first
        );
        if (!isSelected || isSelected?.title === "All") {
            return sortedData;
        }
        return sortedData.filter(
            (item) => item.category?.toLowerCase() === isSelected?.title?.toLowerCase()
        );
    }, [listData, isSelected]);

    const handleDelete = async (data) => {
        if (!data?.id) return
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', data.id)
        if (error) {
            showToast("error", `${error?.message}`)
            console.error("Supabase Delete Error:", error);
        } else {
            getData()
            showToast("success", "Data deleted successfully")
            console.log("Note deleted successfully");
        }
    }

    const handleEdit = (data) => {
        dispatch(placeListParams(data))
        if (data) {
            router?.push('/add-lists')
        }
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
                                onClick={() => setisSelected(item)}
                                className={`mouse-hover cursor-pointer flex items-center px-6 py-2 rounded-md text-left ${isSelected.id === item.id ? 'bg-white' : ''
                                    }`}>
                                <p className={`text-[15px] font-medium ${isSelected?.id == item.id ? 'text-black' : 'text-gray-600'}`}>{item.title}</p>
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
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Url</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarkData?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white even:bg-gray-50 border-b  border-gray-200" >
                                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap ">
                                            <div className="flex flex-col md:flex-row md:justify-around lg:justify-start items-center gap-3 md:gap-5">
                                                {/* <Image src={item.image} width={65} height={65} alt="Picture of the author" className='mr-5 rounded-[5px]' /> */}
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
                                        <td className="px-6 py-6">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
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
