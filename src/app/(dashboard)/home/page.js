"use client";
import Textarea from '../../../components/textarea';
import { Modal } from '../../../components/models';
import { useModal } from '../../../hooks/useModals';
import { notesData } from '../../../utils/constants'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { supabase } from '../../../supabase/supabase';

export default function page() {
  const { isOpen, openModal, closeModal } = useModal();
  const [title, setTitle] = useState("")
  const [textareaData, setTextareaData] = useState("")
  const [ListData, setListData] = useState([])

  const getData = async () => {
    let { data: notes, error } = await supabase
      .from('notes')
      .select('*')
    console.log('notes', JSON.stringify(notes, null, 2))
    setListData(notes)
  }
  useEffect(() => {
    getData()
  }, [])

  const handleSave = () => {
    closeModal()
    handleCreate()
  }

  const handleDelete = () => {
    closeModal()
  }

  const handleCreate = async () => {
    const payload = {
      title,
      content: textareaData
    };
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([payload])
        .select();
      if (error) {
        console.error('Supabase Insert Error:', error);
        return;
      }
      getData()
      console.log('Inserted data:', data);
      setTextareaData("")
      setTitle("")
    } catch (err) {
      console.error('Unexpected Error:', err);
    }
  };







  return (
    <div>

      <div className='flex flex-row items-center'>
        <h1 className='text-[20px] pb-3 text-brand-950 font-bold pr-5'>Take note</h1>
        <button onClick={() => {
          openModal(true);
          // handleCreate()
        }} className='mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block h-12 w-[40%] '>
          <p className='text-left text-[15px] pl-5 text-gray-500'>Click to write</p>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {ListData?.map((item, index) => {
          return (
            <div
              key={index}
              className="relative bg-white text-[17px] border border-gray-300 h-[200px] rounded-[10px] p-5 items-start flex flex-col"
            >
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-2 text-red-500 hover:text-red-700">
                <AiOutlineDelete size={25} color='#BD3039' />
              </button>
              <button
                onClick={() => openModal(!isOpen)}
                className="w-full text-left flex flex-col flex-1 mt-2">
                <p className="text-left font-semibold text-[17px] text-black pb-4">{item.title}</p>
                <p className="text-left font-medium text-[16px] text-gray-500 line-clamp-4">
                  {item.content}
                </p>
              </button>
            </div>
          );
        })}
      </div>


      <Modal
        isOpen={isOpen}
        onClose={handleSave}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className='pt-7'>
          <h1 className='text-[20px] pb-3 text-brand-950 font-bold'>Write note</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700"
          />
          <Textarea value={textareaData} onChange={setTextareaData} />
          <button onClick={handleSave} className='mt-5 w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 inline-flex items-center justify-center ' >
            <p>save</p>
          </button>
        </div>

      </Modal>
    </div>
  )
}
