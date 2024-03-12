'use client';

export function BoardSkeleton() {
    return (
        <div className="grid grid-cols-4 gap-12">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-row items-center justify-between h-12">
                    <div className="flex flex-row space-x-2">
                        <div className="w-24 h-5 bg-gray-300 animate-pulse" />
                        <div className="w-3 h-5 rounded-sm bg-gray-300 animate-pulse" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                </div>
                <div className="flex flex-col space-y-4">
                    <TaskSkeleton />
                    <TaskSkeleton />
                    <TaskSkeleton />
                </div>
                <CreateTaskBtnSkeleton />
            </div>
            <div className="flex flex-col space-y-8">
                <div className="flex flex-row items-center justify-between h-12">
                    <div className="flex flex-row space-x-2">
                        <div className="w-24 h-5 bg-gray-300 animate-pulse" />
                        <div className="w-3 h-5 rounded-sm bg-gray-300 animate-pulse" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                </div>
                <div className="flex flex-col space-y-4">
                    <TaskSkeleton />
                    <TaskSkeleton />
                    <TaskSkeleton />
                </div>
                <CreateTaskBtnSkeleton />
            </div>
            <div className="flex flex-col space-y-8">
                <div className="flex flex-row items-center justify-between h-12">
                    <div className="flex flex-row space-x-2">
                        <div className="w-24 h-5 bg-gray-300 animate-pulse" />
                        <div className="w-3 h-5 rounded-sm bg-gray-300 animate-pulse" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                </div>
                <CreateTaskBtnSkeleton />
            </div>
            <CreateCategoryBtnSkeleton />
        </div>
    );
};

export function TaskSkeleton() {
    return (
        <div className="flex flex-col space-y-4 p-4 bg-gray-700 rounded-lg border-2 border-gray-600">
            <div className='flex flex-row items-center justify-start space-x-4 '>
                <div className="flex flex-col space-y-4 grow">
                    <div className='flex flex-row space-x-2'>
                        <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
                        <div className="grow h-5 bg-gray-300 animate-pulse" />
                    </div>
                    <div className="w-full h-7 bg-gray-300 animate-pulse" />
                </div>
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div className="w-3 h-3 bg-gray-300 animate-pulse" />
                <div className="w-14 h-3 bg-gray-300 animate-pulse" />
            </div>
        </div>
    );
};

export function CreateCategoryBtnSkeleton() {
    return (
        <div className="flex flex-row items-center space-x-8  h-12 bg-gray-700 rounded-lg border-2 border-gray-600 p-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse" />
            <div className="grow h-5 bg-gray-300 animate-pulse" />
        </div>
    );
}

export function CreateTaskBtnSkeleton() {
    return (
        <div className="flex flex-row items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-40 h-4 bg-gray-300 animate-pulse" />
        </div>
    );
}