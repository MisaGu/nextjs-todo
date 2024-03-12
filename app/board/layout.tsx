import { BoardSkeleton } from '@ui/skeletons';
import Image from "next/image";
import { Suspense } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="relative flex place-items-start self-center">
                <Image
                    className="relative dark:invert"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={120}
                    height={25}
                    priority
                />
            </div>
            <Suspense fallback={<BoardSkeleton />}>
                {children}
            </Suspense>
        </>
    );
}
