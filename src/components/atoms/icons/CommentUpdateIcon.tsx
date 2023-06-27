import React from 'react';
import { BsFillPencilFill } from "react-icons/bs";

export default function CommentUpdateIcon({handleUpdate} : {handleUpdate: () => void}) {
    return (
        <div onClick={handleUpdate} className='bg-gray-300 rounded-full p-2 text-black cursor-pointer hover:opacity-90'>
            <BsFillPencilFill />
        </div>
    );
}

