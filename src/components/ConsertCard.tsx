import Image from 'next/image';
import React from 'react';
import { Rank } from './HotRank';

export default function ConsertCard({rank}:{rank: Rank}) {
    return (
        <article className="flex flex-col gap-2 items-center hover:scale-105 duration-300 ease-in-out">
        <Image
          src={rank.image}
          alt={rank.title}
          width={350}
          height={550}
          priority
        />
        <p className="text-lg font-bold">{rank.title}</p>
      </article>
    );
}

