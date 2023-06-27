import React from 'react';

export default function ErrorMessage({message}: {message: string}) {
    return (
        <p className='text-lg font-bold text-red-600'>{message}</p>
    );
}

