'use client';
import Calendar from '@/components/Calendar';
import Topbar from '@/components/TopBar';

export default function Home() {
	return (
		<div className="h-full overflow-y-auto  py-1 px-5">
			<Topbar />
			<Calendar />
		</div>
	);
}
