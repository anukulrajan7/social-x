'use client';
import { useState, useEffect } from 'react';
import {
	format,
	addDays,
	startOfWeek,
	endOfWeek,
	getDate,
	isToday as isTodayDate,
} from 'date-fns';
import { PiPlus } from 'react-icons/pi';
import { FaInstagramSquare, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const mockData = {
	scheduled: [
		{ date: '2024-09-03', time: '10', title: 'New Product Launch' },
		{ date: '2024-09-06', time: '11', title: 'Weekly Highlight' },
	],
	posted: [
		{ date: '2024-09-01', time: '9', title: 'Morning Vibes' },
		{ date: '2024-09-05', time: '10', title: 'Throwback Thursday' },
	],
};

interface WeeklyCalendarProps {
	today: Date;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ today }) => {
	const [currentWeek, setCurrentWeek] = useState({
		start: startOfWeek(today),
		end: endOfWeek(today),
	});
	const [isToday, setIsToday] = useState<boolean>(false);

	useEffect(() => {
		setIsToday(isTodayDate(today));
		setCurrentWeek({
			start: startOfWeek(today),
			end: endOfWeek(today),
		});
	}, [today]);

	const getPostInfo = (date: string, time: number) => {
		const scheduledPost = mockData.scheduled.find(
			(post) => post.date === date && time === Number(post.time)
		);
		const postedContent = mockData.posted.find(
			(post) => post.date === date && time === Number(post.time)
		);

		if (scheduledPost) {
			return { type: 'Scheduled', content: scheduledPost };
		}
		if (postedContent) {
			return { type: 'Posted', content: postedContent };
		}
		return null;
	};

	const dayHeaders = [];
	for (
		let date = currentWeek.start;
		date <= currentWeek.end;
		date = addDays(date, 1)
	) {
		dayHeaders.push(
			<div
				key={date.toISOString()}
				className={`border border-[#E6E6E6] p-2 px-3 font-sans text-start ${
					isTodayDate(date) ? 'bg-[#3292FB]' : 'bg-white'
				}`}
			>
				<p
					className={`font-[400] text-[1rem] ${
						isTodayDate(date) ? 'text-white' : 'text-[#000000]'
					}`}
				>
					{format(date, 'dd')}
				</p>
				<p
					className={`text-[.925rem] ${
						isTodayDate(date) ? 'text-white' : 'text-[#4B4652]'
					}`}
				>
					{format(date, 'EEE')}
				</p>
			</div>
		);
	}

	const timeSlots = Array.from({ length: 10 }, (_, index) => index); // Time slots from 9:00 to 18:00

	const dayCells = [];
	for (
		let date = currentWeek.start;
		date <= currentWeek.end;
		date = addDays(date, 1)
	) {
		const formattedDate = format(date, 'yyyy-MM-dd');
		for (let hour = 0; hour <= 9; hour++) {
			const postInfo = getPostInfo(formattedDate, hour + 9);

			dayCells.push(
				<div
					key={`${formattedDate}-${hour}`}
					className={`border h-[90px] border-[#E6E6E6] flex items-center justify-center cursor-pointer ${
						postInfo
							? postInfo.type === 'Scheduled'
								? 'border-[#B4B0F5] border-2 bg-[#EFF0FF]'
								: 'border-l-[#FF5448] border-[4px] bg-[#FDEDE9]'
							: ''
					}`}
				>
					{postInfo ? (
						<>
							{postInfo?.type === 'Scheduled' && (
								<div className="flex justify-center gap-2 flex-col items-center">
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
			);
		}
	}

	return (
		<div className="max-w-6xl mx-auto w-full">
			{/* Top row with day names */}
			<div className="grid grid-cols-8 border border-gray-300">
				<div className="p-4 bg-white" /> {/* Empty space for time labels */}
				{dayHeaders}
			</div>

			{/* Grid with time slots and day cells */}
			<div className="grid grid-cols-8 items-start">
				{/* Time slot labels */}
				<div className="grid grid-rows-10">
					{timeSlots.map((hour) => (
						<div
							key={hour}
							className="border p-2 h-[90px] border-[#E6E6E6] flex items-center justify-center text-gray-500"
						>
							{`${hour + 9}:00`}
						</div>
					))}
				</div>

				{/* Calendar day cells */}
				<div className="col-span-7 grid grid-cols-7 grid-rows-10">
					{dayCells}
				</div>
			</div>
		</div>
	);
};

export default WeeklyCalendar;
