"use client";
import Textarea from '../../../components/textarea';
import { Modal } from '../../../components/models';
import { useModal } from '../../../hooks/useModals';
import { notesData } from '../../../utils/constants'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { supabase } from '../../../supabase/supabase';

export default function page() {
  const { isOpen, openModal, closeModal ,forceClose } = useModal();
  const [title, setTitle] = useState("")
  const [textareaData, setTextareaData] = useState("")
  const [ListData, setListData] = useState([])
  const [isUpdatingId, setIsUpdatingId] = useState("")
  const [originalValues, setOriginalValues] = useState({ title: "", content: "" });

  const getData = useCallback(async () => {
    const { data: notes, error } = await supabase.from('notes').select('*');
    if (error) {
      console.error('Supabase Fetch Error:', error);
      return;
    }
    console.log('notes count:', notes.length);
    setListData(notes);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const getListData = useMemo(() => {
    return [...ListData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }, [ListData])

  const handleSave = useCallback(async () => {
    const isValid = title.trim().length > 0 && textareaData.trim().length > 0;
    if (isUpdatingId) {
      await handleUpdate();
    } else {
      if (isValid) {
        await handleCreate();
      } else {
        return;
      }
    }
    resetState();
    closeModal();
  }, [title, textareaData, isUpdatingId])

  const handleDelete = (id) => {
    console.log("object", id)
    closeModal()
    handleDeleteNote(id)
  }

  const handleUpdate = async () => {
    if (!isUpdatingId) return;
    const payload = {
      title,
      content: textareaData
    };
    try {
      const { data, error } = await supabase
        .from('notes')
        .update(payload)
        .eq('id', isUpdatingId)
        .select()
      if (error) {
        setIsUpdatingId("")
        console.error('Supabase Insert Error:', error);
        return;
      }
      getData()
      setIsUpdatingId("")
      console.log('handleUpdate data', JSON.stringify(data, null, 2))
      resetState()
    } catch (err) {
      console.error('Unexpected Error:', err);
    }
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
      console.log('handleCreate:', data);
      resetState()
    } catch (err) {
      console.error('Unexpected Error:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);
    getData()
    if (error) {
      console.error("Supabase Delete Error:", error);
    } else {
      console.log("Note deleted successfully");
    }
  };

  const resetState = () => {
    setTextareaData("")
    setTitle("")
  }



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
        {getListData?.map((item, index) => {
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
                onClick={() => {
                  openModal(!isOpen)
                  setTitle(item.title)
                  setTextareaData(item.content)
                  setIsUpdatingId(item.id)
                }}
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
        forceClose={forceClose}
        onClose={handleSave}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className='pt-7'>
          <h1 className='text-[20px] pb-3 text-brand-950 font-bold'>Write note</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-[16px] focus:outline-none rounded-lg block w-full p-2.5 focus:ring-brand-700 focus:border-brand-700"
          />
          <Textarea
            value={textareaData}
            onChange={setTextareaData}
          />
          <button onClick={handleSave} className='mt-5 w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 inline-flex items-center justify-center ' >
            <p>save</p>
          </button>
        </div>

      </Modal>
    </div>
  )
}
