import { permanentRedirect } from 'next/navigation';

export default async function TaskPage() {
    permanentRedirect('/board');
}