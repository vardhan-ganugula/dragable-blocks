import React, {useState} from 'react'
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";

function Header({handleRedo, handleUndo}) {
    
  return (
    <header className='w-full h-28 bg-white flex items-center justify-center'>
        <div className='flex gap-5 text-zinc-600'>
          <GrUndo size={25} className='cursor-pointer' onClick={handleUndo} />
          <GrRedo size={25} className='cursor-pointer' onClick={handleRedo}/>
        </div>
      </header>
  )
}

export default Header