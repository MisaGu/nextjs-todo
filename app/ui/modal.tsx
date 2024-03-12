'use client';

import { useRouter } from 'next/navigation';
import { PiXCircle } from 'react-icons/pi';

export function Modal({ children }: { children: React.ReactNode; }) {
    const router = useRouter();

    return (
        <div className='fixed w-screen h-screen inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10 backdrop-blur-sm' onClick={() => router.back()}>
            <div className='relative w-1/2 bg-gray-700 p-8 rounded-md'>
                <PiXCircle
                    onClick={() => router.back()}
                    className='w-6 h-6 absolute top-4 right-4 cursor-pointer '
                />
                {children}
            </div>
        </div>
    );
}