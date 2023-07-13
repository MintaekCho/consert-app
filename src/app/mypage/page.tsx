import GuideTxt from '@/components/atoms/GuideTxt';
import Profile from '@/components/molecules/Profile';
import MyPageProfile from '@/components/organisms/MyPageProfile';
import React from 'react';

export default function page() {
    return (
        <div className='text-center p-8'>
            <MyPageProfile />
        </div>
    );
}

