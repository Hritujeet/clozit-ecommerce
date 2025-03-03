import { auth } from '@/auth';
import React from 'react';

const Page = async () => {
    const authData = await auth()
    console.log(authData);
    

    return (
        <div>
            {authData?.user?.email}
        </div>
    );
};

export default Page;