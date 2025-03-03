import React from 'react';
import SignInComponent from "@/components/SignInComponent";
import { auth } from '@/auth';

const Page = async () => {
  const authData = await auth();
  console.log(authData);
  
    return (
        <div>
          <SignInComponent></SignInComponent>
        </div>
    );
};

export default Page;