'use client';

import { CategoriesData } from '@lib/interfaces';
import { updateTaskReadyAPI } from '@lib/actions';
import { formatDate } from '@lib/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { PiChatFill, PiCheckBold, PiGear } from 'react-icons/pi';

export default function Board({ categories }: { categories: CategoriesData[]; }) {
    return (
        <div className="grid grid-cols-4 gap-12">
            {categories.map((category) => {
                return <div key={category.id} className="flex flex-col space-y-8">
                    <div className="flex flex-row items-center justify-between h-12">
                        <div className="flex flex-row items-center space-x-2 text-2xl">
                            <div className="font-bold">
                                {category.name}
                            </div>
                            <div className=" dark:text-gray-400">
                                {category.tasks.length}
                            </div>
                        </div>
                        <PiGear className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col space-y-4 mt-8">
                        {category.tasks.map((task) => {
                            return <TaskCard key={task.id} task={task} />;
                        })}
                    </div>
                </div>;
            })}
        </div >
    );
}


function TaskCard({ task }: { task: CategoriesData["tasks"][0]; }) {
    const [ready, setReady] = useState(task.ready);

    function handleReadyChange(event: any) {
        event.preventDefault();

        updateTaskReadyAPI(task.id, !ready, (data) => {
            setReady(data.ready);
        });
    }

    return (
        <Link href={`/task/${task.id}`}>
            <div key={task.id} className="flex flex-col space-y-3 p-4 bg-gray-700 rounded-lg border-2 border-gray-600">
                <div className='flex flex-row items-center justify-start space-x-4 '>
                    <div className="flex flex-col space-y-3">
                        <div className={clsx("flex flex-row items-center space-x-2 overflow-hidden text-ellipsis line-clamp-1 text-lg", ready && "line-through")}>
                            <div className="shrink-0 w-5 h-5 cursor-pointer" onClick={handleReadyChange}>
                                {ready
                                    ? <PiCheckBold className="w-full h-full rounded-lg bg-yellow-500 text-white p-1" />
                                    : <div className="w-full h-full rounded-lg border-2 border-gray-400 " />
                                }
                            </div>
                            <div>
                                {task.title}
                            </div>
                        </div>
                        <div className="overflow-hidden text-ellipsis line-clamp-2 text-gray-400">
                            {task.description}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between text-sm font-bold text-gray-400">
                    <div className="text-sm font-bold text-gray-400">
                        {formatDate(task.createdAt)}
                    </div>
                    <div className="flex flex-row space-x-2">
                        <PiChatFill className="w-fit h-5" />
                        <div>
                            {task.comment_count}
                        </div>
                    </div>
                </div>
            </div >
        </Link>
    );
}