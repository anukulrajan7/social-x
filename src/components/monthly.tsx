import { useState } from 'react';
import {
	format,
	addDays,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	isSameMonth,
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

const MonthlyView = () => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const today = new Date();
	const startOfCurrentMonth = startOfMonth(today);
	const endOfCurrentMonth = endOfMonth(today);

	const handleCellClick = (date: string) => {
		setSelectedDate(date);
	};

	const getPostInfo = (date: string) => {
		const scheduledPost = mockData.scheduled.find((post) => post.date === date);
		const postedContent = mockData.posted.find((post) => post.date === date);
		if (scheduledPost) return { type: 'Scheduled', content: scheduledPost };
		if (postedContent) return { type: 'Posted', content: postedContent };
		return null;
	};

	// Generate days for the current month with padding from the previous and next months
	const days = [];
	for (
		let date = startOfWeek(startOfCurrentMonth);
		date <= endOfWeek(endOfCurrentMonth);
		date = addDays(date, 1)
	) {
		const formattedDate = format(date, 'yyyy-MM-dd');
		const postInfo = getPostInfo(formattedDate);

		days.push(
			<div
				key={formattedDate}
				className={`border h-[100px] flex items-center justify-center cursor-pointer ${
					postInfo
						? postInfo.type === 'Scheduled'
							? 'bg-yellow-200'
							: 'bg-green-200'
						: ''
				} ${isSameMonth(date, today) ? '' : 'bg-gray-100'}`}
				onClick={() => handleCellClick(formattedDate)}
			>
				<div className="text-center">
					<p>{format(date, 'd')}</p>
					{postInfo && <p className="text-xs font-bold">{postInfo.type}</p>}
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			{/* Grid for days of the month */}
			<div className="grid grid-cols-7 gap-2">{days}</div>

			{/* Modal for showing detailed information */}
			{selectedDate && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
						<h2 className="text-xl font-bold mb-4">
							{`Details for ${format(new Date(selectedDate), 'dd MMM yyyy')}`}
						</h2>
						{getPostInfo(selectedDate) ? (
							<div>
								<p className="text-sm font-bold">
									{getPostInfo(selectedDate)?.type}
								</p>
								<p>{getPostInfo(selectedDate)?.content.title}</p>
							</div>
						) : (
							<p>No posts scheduled or posted for this day.</p>
						)}
						<button
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							onClick={() => setSelectedDate(null)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MonthlyView;
