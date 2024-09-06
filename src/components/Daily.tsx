import { useState } from 'react';
import { format } from 'date-fns';

const mockData = {
	scheduled: [{ time: '10:00 AM', title: 'Meeting with Team' }],
	posted: [{ time: '2:00 PM', title: 'Instagram Post: New Collection' }],
};

const DailyView = () => {
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const today = new Date();

	const handleCellClick = (time: string) => {
		setSelectedTime(time);
	};

	const timeSlots = Array.from({ length: 10 }, (_, index) => `${index + 9}:00`);

	return (
		<div className="max-w-4xl mx-auto">
			<h2 className="text-xl mb-4">{format(today, 'dd MMM yyyy')}</h2>

			<div className="grid grid-cols-2 gap-2">
				{timeSlots.map((time) => (
					<div
						key={time}
						className="border h-[100px] flex items-center justify-center cursor-pointer"
						onClick={() => handleCellClick(time)}
					>
						<p>{time}</p>
					</div>
				))}
			</div>

			{selectedTime && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
						<h2 className="text-xl font-bold mb-4">{`Details for ${selectedTime}`}</h2>
						<button
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							onClick={() => setSelectedTime(null)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DailyView;
