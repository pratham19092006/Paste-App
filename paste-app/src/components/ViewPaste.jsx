import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ViewPaste = () => {


  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];

  console.log("Final Paste: ", paste);

  return (
    <div>

<div 
    className='flex flex-row gap-7 place-content-between '>
      <input
        className='p-1 border rounded-2xl mt-2 w-[66%] pl-4'
        type="text"
        placeholder='enter title here'
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* <button 
      onClick={createPaste}
      className='p-2 border rounded-2xl mt-2'>
        {
            pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button> */}
    </div>

    <div>
        <textarea
            className="rounded-2xl mt-4 min-w-[500px] p-4"
            value={paste.content}
            disabled
            placeholder='enter content here'
            onChange={(e) => setValue(e.target.value)}
            rows={20}
        />
    </div>
    </div>
  )
}

export default ViewPaste
