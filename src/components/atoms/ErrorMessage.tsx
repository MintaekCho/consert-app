import React from 'react';

export default function ErrorMessage({message}: {message: string}) {
    return (
        <p className='text-[10px] sm:text-sm lg:text-lg font-bold text-red-600'>{message}</p>
    );
}

