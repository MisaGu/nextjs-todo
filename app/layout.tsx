import clsx from 'clsx';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS ToDo App",
  description: "A simple todo app built with NextJS + TypeScript + TailwindCSS",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className, 'dark:bg-gray-800 dark:text-white')}>
        <main className="flex min-h-screen flex-col space-y-24 p-24">
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}
