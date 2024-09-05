'use client';
import Calendar from '@/components/Calendar';
import Topbar from '@/components/TopBar';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="h-full overflow-y-auto  py-1 px-5">
			<Topbar />
			<Calendar />
		</div>
	);
}
