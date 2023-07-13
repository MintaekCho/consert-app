import React from 'react';
import ChangeDisplayName from '../molecules/ChangeDisplayName';
import Profile from '../molecules/Profile';

export default function MyPageProfile() {
    return (
        <div>
            <Profile w={250} h={250} textSize={'xl'} />
            <ChangeDisplayName />
        </div>
    );
}

