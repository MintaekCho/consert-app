import React from 'react';

type Props = {
    name: string;
    onclick: () => void;
}

export default function HeaderButton({name, onclick}: Props) {
    return (
        <button className='p-2 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl bg-purple-700 rounded-lg text-white hover:opacity-90' onClick={onclick}>
            {name}
        </button>
    );
}

