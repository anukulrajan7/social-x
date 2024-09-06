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
	addHours,
} from 'date-fns';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';

import { IoMdShare } from 'react-icons/io';
import { Modal } from './Modal'; // Reuse the modal component for adding/editing events
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { BiCopy } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import Calendar from './CalendarModal';

interface Event {
	id: number;
	date: string;
	title: string;
}

const CustomCalendar: React.FC = () => {
	const [view, setView] = useState<string>('monthly');
	const [typeView, setTypeView] = useState<string>('Calendar View');
	const [shareModal, setShareModal] = useState<boolean>(false);
	const [showCalendar, setShowCalendar] = useState(false);
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
			const timeSlots = Array.from({ length: 10 }, (_, index) => index); // 24-hour time slots

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
					{`${hour + 9}:00`}
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
					<div className="grid grid-cols-8 border">
						<div className="p-4 bg-white" /> {dayHeaders}
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
		<div className="p-6 bg-white rounded-md shadow-sm flex flex-col h-full">
			<div className="flex w-full justify-between items-center mb-4">
				<div
					role="tablist"
					className="w-fit flex bg-gray-100 rounded-md px-1 py-1 gap-2"
				>
					{['List View', 'Calendar View'].map((type, index) => {
						return (
							<button
								role="tab"
								key={index}
								className={`${
									type === typeView
										? 'bg-white text-[#4B4652] rounded-md '
										: 'text-[#1A1626]'
								} text-[.825rem] font-[500] p-2 px-3 flex items-center gap-2`}
								onClick={() => {}}
							>
								{type === 'Calendar View' && (
									<RiCalendarScheduleLine className="text-[#5E17EB] text-lg" />
								)}
								{type}
							</button>
						);
					})}
				</div>
				<div className="bg-[#FAFAFA] h-full p-2 rounded-md px-3 flex justify-center items-center shadow-sm">
					<IoMdShare
						className="text-[#4B4652]"
						onClick={() => setShareModal(true)}
					/>
				</div>
			</div>
			<div className="flex items-center justify-between my-2 mb-3 ">
				<div className="flex gap-9 items-center  justify-between">
					<div className="flex gap-4 items-center">
						<button
							onClick={() => setCurrentDate(subMonths(currentDate, 1))}
							className="border-[#E6E6E6] border-[1px] h-[24px] w-[24px] flex justify-center items-center rounded-md shadow-sm "
						>
							<FaChevronLeft
								className="text-[#4B4652] text-sm"
								onClick={() => setTypeView('')}
							/>
						</button>
						<p
							className="text-[#1A1626] font-[500] text-[14px]"
							onClick={() => setShowCalendar(true)}
						>
							16-25 Aug 2024
						</p>
						<button
							onClick={() => setCurrentDate(addMonths(currentDate, 1))}
							className="border-[#E6E6E6] border-[1px] h-[24px] w-[24px]  flex justify-center items-center rounded-md shadow-sm "
						>
							<FaChevronRight className="text-[#4B4652] text-sm" />
						</button>
					</div>
					<button className="border-[#E6E6E6] rounded-md p-1 px-3 text-[#1A1626] text-sm font-[500] border-[2px]">
						Today
					</button>
				</div>
				<div className="flex justify-between mb-4">
					<div>
						<div
							role="tablist"
							className="tabs flex border-[1px] border-[#E6E6E6]  rounded-md items-center gap-2 py-1"
						>
							{['daily', 'weekly', 'monthly'].map((type, index) => {
								return (
									<button
										role="tab"
										key={index}
										className={`${
											view == type
												? 'bg-[#EBF1FD] rounded-md  py-[.4rem] text-sm text-[#4C6AF2] border-[1px] border-[#8CA8FD] capitalize'
												: 'mx-2 my-1 text-[#726E7A] capitalize text-sm'
										} px-5`}
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
				</div>{' '}
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
			{shareModal && (
				<div className="modal modal-open bg-white">
					<div className="modal-box bg-white w-[25vw] relative py-3 flex flex-col gap-3">
						<div
							onClick={() => {
								setShareModal(false);
							}}
							className="text-[#4B4652] absolute top-[4%] right-[4%] bg-[#F2F2F2] h-[25px] w-[25px] flex justify-center items-center rounded-md shadow-sm p-1"
						>
							<RxCross1 className=" text-[1rem] " />
						</div>
						<div className="flex flex-col">
							<p className="text-[#1A1626] text-[1rem] font-[500]">
								{' '}
								Share your calendar
							</p>
							<p className="text-[#726E7A] text-[12px] font-[400] ">
								Invite your team to review and offer feedback.
							</p>
						</div>
						<div className="h-[1px]  w-full bg-[#ECECEC] "></div>
						<div className="flex items-center gap-2 ">
							<input
								type="text"
								name=""
								placeholder="Email"
								id=""
								className=" w-[75%] placeholder:text-gray-400 px-4 py-1 h-[2.4rem] rounded-md border-gray-400 outline-none border-[2px] bg-white font-light"
							/>
							<button className="bg-[#5E17EB] text-white rounded-lg px-4 w-[25%] h-[2.4rem] text-[1rem] ">
								Invite
							</button>
						</div>
						<p className="text-[#4B4652] font-[500] text-[.825rem]">
							Share link
						</p>
						<div className="flex border-[#E6E6E6] border-[2px] justify-between p-1 px-1 items-center rounded-md">
							<p className="flex justify-center items-center gap-2 ml-2">
								<BsWhatsapp className="text-[#25D366] text-lg" />
								<span className="text-[#1A1626] text-[.825rem] font-[500] ">
									Whatsapp
								</span>
							</p>
							<button className="border-[#E6E6E6] border-[2px] px-2 py-1 rounded-md text-[#4B4652] capitalize text-[.825rem]">
								share
							</button>
						</div>
						<div className="flex border-[#E6E6E6] border-[2px] justify-between p-1 px-1 items-center rounded-md">
							<p className="flex justify-center items-center gap-2 ml-2">
								<FaFacebook className="text-blue-600" />
								<span className="text-[#1A1626] text-[.825rem] font-[500]">
									Facebook
								</span>
							</p>
							<button className="border-[#E6E6E6] border-[2px] px-2 py-1 rounded-md text-[#4B4652] capitalize text-[.825rem]">
								share
							</button>
						</div>
						<div className="flex items-center p-1 mb-2 justify-between">
							<p className="text-[#4B4652] text-[14px] ">http://demo.com</p>
							<button className="flex items-center text-[#3292FB] rounded-md p-1 text-sm px-4 gap-2 border-[2px] border-[#3292FB]">
								<BiCopy></BiCopy>
								<span>Copy link</span>
							</button>
						</div>
					</div>
				</div>
			)}
			{showCalendar && (
				<div
					className="modal modal-open bg-white"
					onClick={() => {
						setShowCalendar(false);
					}}
				>
					<div className="modal-box bg-white w-[25vw] relative py-1 flex flex-col gap-3">
						<Calendar />
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomCalendar;
