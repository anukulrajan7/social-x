import { format, addDays, addHours } from 'date-fns';

const WeeklyView = ({
	view,
	startOfCurrentWeek,
	endOfCurrentWeek,
	events,
	handleDateClick,
}) => {
	if (view === 'weekly') {
		const days = [];
		const timeSlots = Array.from({ length: 24 }, (_, index) => index); // 24-hour time slots

		// Create day headers for the top row (x-axis)
		const dayHeaders = [];
		for (
			let date = startOfCurrentWeek;
			date <= endOfCurrentWeek;
			date = addDays(date, 1)
		) {
			dayHeaders.push(
				<div
					key={date.toISOString()}
					className="border p-4 bg-white text-center"
				>
					<h3 className="font-bold">{format(date, 'EEEE')}</h3>
					<p>{format(date, 'MMM dd')}</p>
				</div>
			);
		}

		// Create grid cells for time slots
		const gridCells = timeSlots.map((hour) => (
			<div key={hour} className="border p-2">
				{`${hour}:00`}
			</div>
		));

		// Create cells for each day at each time slot
		const dayCells = [];
		for (
			let date = startOfCurrentWeek;
			date <= endOfCurrentWeek;
			date = addDays(date, 1)
		) {
			for (let hour = 0; hour < 24; hour++) {
				const currentDateTime = addHours(new Date(date), hour);
				dayCells.push(
					<div
						key={`${date.toISOString()}-${hour}`}
						className="border p-4 cursor-pointer bg-white"
						onClick={() => handleDateClick(currentDateTime)}
					>
						{events
							.filter(
								(event) =>
									format(new Date(event.date), 'yyyy-MM-dd HH') ===
									format(currentDateTime, 'yyyy-MM-dd HH')
							)
							.map((event) => (
								<div key={event.id} className="mt-2 p-2 bg-blue-100 rounded">
									{event.title}
								</div>
							))}
					</div>
				);
			}
		}

		// Render the calendar grid
		return (
			<div>
				{/* Top row with day names */}
				<div className="grid grid-cols-8">
					<div className="p-4 bg-white" />{' '}
					{/* Empty cell for time slot labels */}
					{dayHeaders}
				</div>

				{/* Grid with time slots and day cells */}
				<div className="grid grid-cols-8">
					<div className="grid grid-rows-24">{gridCells}</div>{' '}
					{/* Time slot labels (y-axis) */}
					<div className="col-span-7 grid grid-cols-7 grid-rows-24">
						{dayCells}
					</div>{' '}
					{/* Day x-axis and time y-axis */}
				</div>
			</div>
		);
	}

	return null;
};

export default WeeklyView;
