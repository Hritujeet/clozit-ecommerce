import { auth } from '@/auth';
import React from 'react';

const Page = async () => {
    const authData = await auth()
    console.log(authData);
    

    return (
        <div className='flex flex-col gap-1'>
            <p>{authData?.user?.id}</p>
            <p>{authData?.user?.email}</p>
        </div>
    );
};

export default Page;