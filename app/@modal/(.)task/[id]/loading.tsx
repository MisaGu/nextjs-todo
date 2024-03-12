export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-pulse w-24 h-24 bg-gray-200 rounded-full" />
            <div className="text-2xl font-bold">Loading...</div>
        </div>
    );
}