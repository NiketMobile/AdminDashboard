"use client"
import { supabase } from '../../../supabase/supabase'
import DropdownMenu from '../../../components/dropdownMenu'
import { styles } from '../../../utils/styles_css'
import React, { useEffect, useState } from 'react'
import showToast from '../../../components/showMessage'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useRouter } from 'next/navigation'
import { placeListParams } from '../../../redux/reducers/pagesReducer'


//  "id": 11,
//   "created_at": "2025-07-17T09:51:48.394324+00:00",
//   "name": "qweqwe",
//   "url": "qweqwe",
//   "description": "qweqwe",
//   "category": "Javascript"

export default function page() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dropdownValue, setDropdownValue] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const updateData = useSelector((state) => state?.pages?.listParams)
    const [isUpdateId, setIsUpdateId] = useState("")
    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        if (updateData) {
            setName(updateData?.name)
            setDescription(updateData?.description)
            setDropdownValue(updateData?.category)
            setUrl(updateData?.url)
            setIsUpdateId(updateData?.id)
        } else {
            resetState()
            setIsUpdateId("")
        }
    }, [updateData])

    const [isError, setIsError] = useState({
        messgae: "",
        field: ""
    })

    console.log('dropdownValue', JSON.stringify(dropdownValue, null, 2))

    const checkValid = () => {
        if (!name.trim()) {
            return { message: "Name is required", field: "name" };
        } else if (!description.trim()) {
            return { message: "Description is required", field: "description" };
        } else if (!url.trim()) {
            return { message: "URL is required", field: "url" };
        } else if (!dropdownValue) {
            return { message: "Category is required", field: "dropdown" };
        }
        // } else if (updateData) {
        //     if (!dropdownValue) {
        //         return { message: "Category is required", field: "dropdown" };
        //     } else {
        //         return { message: "Category is required", field: "dropdown" };
        //     }
        // }
        return null;
    };

    const submitData = async () => {
        const error = checkValid();
        if (error) {
            setIsError(error);
            showToast("error", error.message);
            return;
        }
        setIsError({ message: "", field: "" });
        setIsLoading(true)
        const payload = {
            name: name,
            url: url,
            description: description,
            category: updateData ? dropdownValue : dropdownValue
        }
        if (updateData) {
            handleUpdate(payload)
        } else {
            handleCreate(payload)
        }
    }

    const handleCreate = async (payload) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .insert([payload])
                .select()
            console.log(data, "-=-=-=-=submitData")
            if (error) {
                console.error('Supabase Insert Error:', error);
                return;
            }
            showToast("success", "Data added successfully")
            console.log('handleCreate:', data);
            router?.push('/lists')
        } catch (err) {
            console.error('Unexpected Error:', err);
        } finally {
            resetState()
            setIsLoading(false)
        }
    }
    const handleUpdate = async (payload) => {
        if (!isUpdateId) return
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .update(payload)
                .eq('id', isUpdateId)
                .select()

            if (error) {
                console.error('Supabase update Error:', error);
                return;
            }
            dispatch(placeListParams(data))
            router?.push('/lists')
            showToast("success", "Data update successfully")
            console.log('handleCreate:', data);
        } catch (err) {
            console.error('Unexpected Error:', err);
        } finally {
            resetState()
            setIsLoading(false)
        }
    }



    const resetState = () => {
        setName("")
        setDescription("")
        setDropdownValue("")
        setUrl("")
    }


    return (
        <div className="flex items-center justify-center py-10 bg-gray-100">
            <div className="bg-white md:w-[450px] lg:w-[600px]  p-6 border border-gray-300 rounded-[10px] shadow-md">
                <h1 className="text-center pb-7 text-[23px] text-brand-950 font-bold">Add data</h1>

                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700 " />
                </div>
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Url</label>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700 " />
                </div>
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="message" rows="4" className="block w-full p-2.5  text-[16px] text-gray-900 bg-gray-50 rounded-lg border focus:outline-none border-gray-300 focus:ring-brand-700 focus:border-brand-700" placeholder="Write description here..."></textarea>
                </div>
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Dropdown Menu</label>
                    <DropdownMenu value={dropdownValue} onSubmit={setDropdownValue} />
                </div>

                <button
                    onClick={submitData}
                    className='mouse-hover cursor-pointer mt-5 w-full text-white bg-blue-700 hover:bg-blue-600 active:scale-[0.97] focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 inline-flex items-center justify-center transition-transform duration-100'
                >
                    <p className="font-bold text-[17px] text-center">Submit</p>
                </button>

            </div>
        </div>
    )
}
