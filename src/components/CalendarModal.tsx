import { useState, useEffect } from 'react';
import {
	format,
	getDate,
	getDaysInMonth,
	startOfMonth,
	addMonths,
	subMonths,
	startOfWeek,
} from 'date-fns';

import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';

const generateCalendarDays = (currentMonth: Date) => {
	const daysInMonth = getDaysInMonth(currentMonth);
	const startOfTheMonth = startOfMonth(currentMonth);
	const startDay = startOfWeek(startOfTheMonth, { weekStartsOn: 0 }).getDay();

	// Generate an array of days in the current month
	const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	// Add leading empty days for the first week
	const leadingEmptyDays = Array.from({ length: startDay }, () => '');

	return [...leadingEmptyDays, ...daysArray];
};

const Calendar = () => {
	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today);
	const [days, setDays] = useState<(number | string)[]>([]);

	useEffect(() => {
		const daysArray = generateCalendarDays(currentMonth);
		setDays(daysArray);
	}, [currentMonth]);

	const prevMonth = () => {
		setCurrentMonth(subMonths(currentMonth, 1));
	};

	const nextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const isToday = (day: number) => {
		return (
			day === getDate(today) &&
			format(currentMonth, 'MM-yyyy') === format(today, 'MM-yyyy')
		);
	};

	return (
		<div className="max-w-md mx-auto py-4 flex flex-col items-center gap-3">
			<div className="flex gap-4 items-center bg-gray-100 rounded-md">
				<button
					onClick={prevMonth}
					className="border-[#E6E6E6] bg-white border-[1px] h-[24px] w-[24px] flex justify-center items-center rounded-md shadow-sm "
				>
					<FaChevronLeft className="text-[#4B4652] text-sm" />
				</button>
				<p className="text-[#1A1626] font-[500] text-[14px]">
					{format(currentMonth, 'MMMM')}
				</p>
				<button
					onClick={nextMonth}
					className="border-[#E6E6E6] bg-white  border-[1px] h-[24px] w-[24px]  flex justify-center items-center rounded-md shadow-sm "
				>
					<FaChevronRight className="text-[#4B4652] text-sm" />
				</button>
			</div>
			<div className="bg-gray-100 w-full h-[1px] my-1"></div>
			{/* Calendar Grid */}
			<div className="grid grid-cols-7 gap-4 text-center w-full">
				{/* Weekday Headers */}
				{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
					<div key={day} className="font-sans text-[#726E7A] text-sm">
						{day}
					</div>
				))}

				{/* Calendar Days */}
				{days.map((day, index) => (
					<div
						key={index}
						className={`px-2 py-2 rounded-md cursor-pointer hover:bg-[#F2F2F2] ${
							isToday(day as number)
								? 'bg-[#5E17EB] text-white'
								: 'text-[#1A1626] '
						} text-[12px]`}
					>
						{day}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
