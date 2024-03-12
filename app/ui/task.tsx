'use client';

import { TaskData } from '@lib/interfaces';
import { createCommentAPI, updateTaskDescriptionAPI, updateTaskReadyAPI, updateTaskTitleAPI } from '@lib/actions';
import { formatDate } from '@lib/utils';
import { useState } from 'react';
import { PiCheckBold } from 'react-icons/pi';

export function Task({ task }: { task: TaskData; }) {
    const [title, setTitle] = useState(task.title);
    const [ready, setReady] = useState(task.ready);
    const [description, setDescription] = useState(task.description);
    const [comment, setComment] = useState('');
    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false);

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value);
    }


    function handleTitleClick(edit: boolean) {
        setEditTitle(edit);

        if (!edit) {
            updateTaskTitleAPI(task.id, title, (data) => {
                setTitle(data.title);
            });
        }
    }

    function handleDescriptionClick(edit: boolean) {
        setEditDescription(edit);

        if (!edit) {
            updateTaskDescriptionAPI(task.id, description, (data) => {
                setDescription(data.description);
            });
        }
    }

    function handleReadyChange() {
        updateTaskReadyAPI(task.id, !ready, (data) => {
            setReady(data.ready);
        });
    }

    function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComment(e.target.value);
    }

    function handleCommentClick() {
        createCommentAPI(task.id, comment, (data) => {
            setComment(data.content);
        });
    }

    return (
        <div className='flex flex-col' onClick={(e: any) => e.stopPropagation()}>
            <div className='flex flex-col '>
                <div className='flex flex-row items-center space-x-2 text-2xl'>
                    <div className="shrink-0 w-5 h-5 cursor-pointer" onClick={handleReadyChange}>
                        {ready
                            ? <PiCheckBold className="w-full h-full rounded-lg bg-yellow-500 text-white p-1" />
                            : <div className="w-full h-full rounded-lg border-2 border-gray-400 " />
                        }
                    </div>
                    <div className='font-bold grow'>
                        {editTitle
                            ? <div className='relative'>
                                <input type='text' value={title} className='w-full bg-gray-600 outline-none rounded-sm h-8' onKeyDown={(e) => e.key == 'Enter' && handleTitleClick(false)} onChange={handleTitleChange} />

                            </div>
                            : <div onClick={() => handleTitleClick(true)}>{title}</div>
                        }
                    </div>
                </div>
                <div className='text-sm text-gray-400'>
                    {task.id}
                </div>
            </div>
            <div className='flex flex-col space-y-2 mt-6'>
                <div className='font-bold'>Description</div>
                <div className='text-gray-400'>
                    {editDescription
                        ? <div className='relative'>
                            <textarea maxLength={350} rows={5} value={description} className='w-full bg-gray-600 outline-none rounded-sm p-1' onKeyDown={(e) => e.key == 'Enter' && handleDescriptionClick(false)} onChange={handleDescriptionChange} />
                            <button className='flex items-center justify-center bg-green-700 text-center rounded w-12 h-8 leading-8 text-white' onClick={() => handleDescriptionClick(false)}> Save</button>
                        </div>
                        : <div onClick={() => handleDescriptionClick(true)}>{description}</div>
                    }
                </div>
            </div>
            <hr className='border-gray-600 my-4' />
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-row items-center font-bold space-x-2'>
                    <div>Comments</div>
                    <div className='text-sm text-gray-400'>{task.comments.length}</div>
                </div>
                <div className='flex flex-col space-y-4'>
                    {
                        task.comments.map(comment => {
                            return <div key={comment.id} className='flex flex-col border border-gray-500 rounded-lg p-3'>
                                <div className='flex flex-row items-start justify-between space-x-2'>
                                    <div className='font-lg'>{comment.content}</div>
                                    <div className='text-sm text-gray-400'>{formatDate(comment.createdAt)}</div>
                                </div>
                            </div>;
                        })
                    }
                    <div className='flex flex-col border border-gray-500 rounded-lg p-3'>
                        <div className='flex flex-row items-start justify-between space-x-2'>
                            <input type='text' placeholder='New comment' value={comment} className='grow bg-gray-600 outline-none rounded-sm h-8 px-2' onKeyDown={(e) => e.key == 'Enter' && handleCommentClick()} onChange={handleCommentChange} />
                            <button className='flex items-center justify-center bg-green-700 text-center rounded w-12 h-8 leading-8 text-white' onClick={() => handleCommentClick()}> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}