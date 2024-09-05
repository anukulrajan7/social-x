'use client';
import React, { useState } from 'react';
import {
	format,
	addDays,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	addMonths,
	subMonths,
} from 'date-fns';
import { Modal } from './Modal'; // Reuse the modal component for adding/editing events

interface Event {
	id: number;
	date: string;
	title: string;
}

const CustomCalendar: React.FC = () => {
	const [view, setView] = useState<string>('monthly');
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [events, setEvents] = useState<Event[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [eventData, setEventData] = useState<Event>({
		id: 0,
		date: '',
		title: '',
	});

	// Utility functions
	const startOfCurrentWeek = startOfWeek(currentDate);
	const endOfCurrentWeek = endOfWeek(currentDate);
	const startOfCurrentMonth = startOfMonth(currentDate);
	const endOfCurrentMonth = endOfMonth(currentDate);

	const handleDateClick = (date: Date) => {
		setEventData({ id: Math.random(), date: date.toISOString(), title: '' });
		setModalOpen(true);
	};

	const handleAddEvent = () => {
		setEvents([...events, eventData]);
		setModalOpen(false);
	};

	const renderGrid = () => {
		if (view === 'daily') {
			return (
				<div className="grid grid-cols-1 gap-4 p-4 border rounded bg-white">
					<div
						className="border p-4"
						onClick={() => handleDateClick(currentDate)}
					>
						<h3 className="font-bold">{format(currentDate, 'EEEE, MMM dd')}</h3>
						<div>
							{events
								.filter(
									(event) =>
										format(new Date(event.date), 'yyyy-MM-dd') ===
										format(currentDate, 'yyyy-MM-dd')
								)
								.map((event) => (
									<div key={event.id} className="mt-2 p-2 bg-blue-100 rounded">
										{event.title}
									</div>
								))}
						</div>
					</div>
				</div>
			);
		}

		if (view === 'weekly') {
			const days = [];
			for (
				let date = startOfCurrentWeek;
				date <= endOfCurrentWeek;
				date = addDays(date, 1)
			) {
				days.push(
					<div
						key={date.toISOString()}
						className="border p-4 cursor-pointer bg-white"
						onClick={() => handleDateClick(date)}
					>
						<h3 className="font-bold">{format(date, 'EEEE, MMM dd')}</h3>
						{events
							.filter(
								(event) =>
									format(new Date(event.date), 'yyyy-MM-dd') ===
									format(date, 'yyyy-MM-dd')
							)
							.map((event) => (
								<div key={event.id} className="mt-2 p-2 bg-blue-100 rounded">
									{event.title}
								</div>
							))}
					</div>
				);
			}
			return <div className="grid grid-cols-7 gap-4">{days}</div>;
		}

		if (view === 'monthly') {
			const days = [];
			let date = startOfCurrentMonth;
			while (date <= endOfCurrentMonth) {
				days.push(
					<div
						key={date.toISOString()}
						className="border p-4 cursor-pointer bg-white"
						onClick={() => handleDateClick(date)}
					>
						<h3 className="font-bold">{format(date, 'MMM dd')}</h3>
						{events
							.filter(
								(event) =>
									format(new Date(event.date), 'yyyy-MM-dd') ===
									format(date, 'yyyy-MM-dd')
							)
							.map((event) => (
								<div key={event.id} className="mt-2 p-2 bg-blue-100 rounded">
									{event.title}
								</div>
							))}
					</div>
				);
				date = addDays(date, 1);
			}
			return <div className="grid grid-cols-7 gap-4">{days}</div>;
		}
	};

	return (
		<div className="p-6 bg-white rounded-md shadow-sm flex flex-col">
			<div></div>
			<div className="flex justify-between mb-4">
				<div>
					<div role="tablist" className="tabs flex">
						{['daily', 'weekly', 'monthly'].map((type, index) => {
							return (
								<button
									role="tab"
									key={index}
									className={`${view == type ? 'tab-active' : 'tab'}`}
									onClick={() => {
										setView(type);
									}}
								>
									{type}
								</button>
							);
						})}
					</div>
				</div>
				<div>
					<button
						className="btn btn-secondary mr-2"
						onClick={() => setCurrentDate(subMonths(currentDate, 1))}
					>
						Previous
					</button>
					<button
						className="btn btn-secondary"
						onClick={() => setCurrentDate(addMonths(currentDate, 1))}
					>
						Next
					</button>
				</div>
			</div>

			{/* Calendar Grid */}
			{renderGrid()}

			{/* Modal for event creation */}
			{modalOpen && (
				<Modal
					title={`Add Event for ${format(
						new Date(eventData.date),
						'dd MMM yyyy'
					)}`}
					onClose={() => setModalOpen(false)}
					onSubmit={handleAddEvent}
				>
					<div className="form-control">
						<label className="label">Title</label>
						<input
							type="text"
							className="input input-bordered"
							value={eventData.title}
							onChange={(e) =>
								setEventData({ ...eventData, title: e.target.value })
							}
						/>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default CustomCalendar;
