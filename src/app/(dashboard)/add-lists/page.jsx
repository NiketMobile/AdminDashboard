"use client"
import DropdownMenu from '../../../components/dropdownMenu'
import { styles } from '../../../utils/styles_css'
import React, { useState } from 'react'

export default function page() {
    const [category, setCategory] = useState("")



    return (
        <div className="flex items-center justify-center py-10 bg-gray-100">
            <div className="bg-white md:w-[450px] lg:w-[600px]  p-6 border border-gray-300 rounded-[10px] shadow-md">
                <h1 className="text-center pb-7 text-3xl text-brand-950 font-bold">Add data</h1>
                
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Name</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700 " />
                </div>
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Image url</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700 " />
                </div>
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Description</label>
                    <textarea id="message" rows="4" className="block w-full p-2.5  text-[16px] text-gray-900 bg-gray-50 rounded-lg border focus:outline-none border-gray-300 focus:ring-brand-700 focus:border-brand-700" placeholder="Write description here..."></textarea>
                </div>
                <div className="mb-6">
                    <label className={styles.inputLabelClass}>Dropdown Menu</label>
                    <DropdownMenu onSubmit={setCategory} />
                </div>

                <button className='mouse-hover cursor-pointer mt-5 w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 inline-flex items-center justify-center '>
                    <p className={"font-bold text-[17px] text-center "}>Submit</p>
                </button>

            </div>
        </div>
    )
}
