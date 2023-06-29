import React from 'react';

type Props = {
    name: string;
    onclick: () => void;
}

export default function HeaderButton({name, onclick}: Props) {
    return (
        <button className='p-2 text-lg bg-purple-700 rounded-lg text-white' onClick={onclick}>
            {name}
        </button>
    );
}

