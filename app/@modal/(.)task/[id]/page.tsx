"use client";

import { TaskData } from '@lib/interfaces';
import { fetchTaskAPI } from '@lib/actions';
import { Modal } from '@ui/modal';
import { Task } from '@ui/task';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskSlot() {
    const { id } = useParams<{ id: string; }>();
    const [task, setTask] = useState<TaskData>();

    useEffect(() => {
        fetchTaskAPI(id, (data) => {
            setTask(data);
        });
    }, [id]);

    return (
        <Modal>
            {!task
                ? <div>Loading...</div>
                : <Task task={task!} />
            }
        </Modal>
    );
}