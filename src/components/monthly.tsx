'use client';
import { useState, useEffect } from 'react';
import { PiPlus } from 'react-icons/pi';
import { FaInstagramSquare, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import {
	format,
	addDays,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	isSameMonth,
	isSameDay,
} from 'date-fns';

// Mock data for scheduled and posted Instagram posts
const mockData = {
	scheduled: [
		{ date: '2024-09-12', title: 'Scheduled Post 1' },
		{ date: '2024-09-16', title: 'Scheduled Post 2' },
	],
	posted: [
		{ date: '2024-09-10', title: 'Posted Content 1' },
		{ date: '2024-09-20', title: 'Posted Content 2' },
	],
};
interface WeeklyCalendarProps {
	today: Date;
}

const MonthlyView: React.FC<WeeklyCalendarProps> = ({ today }) => {
	const [currentWeek, setCurrentWeek] = useState({
		start: startOfMonth(today),
		end: endOfMonth(today),
	});

	useEffect(() => {
		setCurrentWeek({
			start: startOfMonth(today),
			end: endOfMonth(today),
		});
	}, [today]);

	const getPostInfo = (date: string) => {
		const scheduledPost = mockData.scheduled.find((post) => post.date === date);
		const postedContent = mockData.posted.find((post) => post.date === date);
		if (scheduledPost) return { type: 'Scheduled', content: scheduledPost };
		if (postedContent) return { type: 'Posted', content: postedContent };
		return null;
	};

	const days = [];
	for (
		let date = startOfWeek(currentWeek.start, { weekStartsOn: 1 });
		date <= endOfWeek(currentWeek.end, { weekStartsOn: 1 });
		date = addDays(date, 1)
	) {
		const formattedDate = format(date, 'yyyy-MM-dd');
		const postInfo = getPostInfo(formattedDate);

		// Check if the current date is today
		const isToday = isSameDay(date, today) && isSameMonth(date, today);

		days.push(
			<div
				key={formattedDate}
				className={`border h-[120px] border-[#E6E6E6] flex items-start p-[5px] justify-start cursor-pointer text-black ${
					postInfo
						? postInfo.type === 'Scheduled'
							? 'border-[#B4B0F5] border-2 bg-[#EFF0FF]'
							: 'border-l-[#FF5448] border-[4px] bg-[#FDEDE9]'
						: ''
				}`}
			>
				<div className="text-center text-[14px] w-full">
					<p
						className={`text-start ${
							isToday
								? 'bg-[#3292FB] p-1 px-2 rounded-full text-white w-fit'
								: ''
						}`}
					>
						{format(date, 'd')}
					</p>
					{postInfo ? (
						<>
							{postInfo?.type === 'Scheduled' && (
								<div className="flex justify-center gap-2 flex-col items-center w-full">
									<PiPlus className="text-gray-400 text-lg" />
									<p className="text-[#726E7A] text-sm text-center">Add Post</p>
								</div>
							)}
							{postInfo?.type !== 'Scheduled' && (
								<div className="flex flex-col items-center">
									<p className="text-sm text-gray-600 font-sans">
										5 post Schedule
									</p>
									<div className="flex gap-2 p-1 flex-wrap px-2 items-center justify-center">
										<FaInstagramSquare className="text-red-500 text-[1.5rem] rounded-full" />
										<FaFacebook className="text-blue-700 text-[1.5rem] rounded-full" />
										<FaLinkedin className="text-blue-500 text-[1.5rem] rounded-full" />
										<RiTwitterXFill className="text-black text-[1.2rem]" />
									</div>
								</div>
							)}
						</>
					) : (
						''
					)}
				</div>
			</div>
		);
	}

	const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	return (
		<div className="mx-auto w-full">
			{/* Grid for days of the month */}
			<div>
				<div className="grid grid-cols-7">
					{weekDays.map((day) => (
						<div
							key={day}
							className={`border border-[#E6E6E6] p-2 px-3 font-sans h-[40px] bg-white text-[1rem] text-black text-center`}
						>
							{day}
						</div>
					))}
				</div>

				<div className="grid grid-cols-7">{days}</div>
			</div>
		</div>
	);
};

export default MonthlyView;
