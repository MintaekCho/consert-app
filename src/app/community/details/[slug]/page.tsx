import WriteDetailsInfo from '@/components/templetes/WriteDetailsInfo';
import React from 'react';

type Props = {
    params: {
        slug: string;
    }
}
export default function page({params : {slug}}: Props) {
    return (
        <WriteDetailsInfo writeId={slug} />
    );
}

