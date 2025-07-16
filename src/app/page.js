'use client';

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const cookieToken = Cookies.get('calanderToken');

  console.log('Cookie Token:', cookieToken);

  useEffect(() => {
    router.push('/home');
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    </div>
  );
}
