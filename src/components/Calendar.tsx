'use client';
import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { BiCopy } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import Calendar from './CalendarModal';
import MonthlyView from './monthly';
import WeeklyCalendar from './weekly';
import DailyView from './Daily';

const CustomCalendar: React.FC = () => {
	const [view, setView] = useState<string>('monthly');
	const [typeView, setTypeView] = useState<string>('Calendar View');
	const [shareModal, setShareModal] = useState<boolean>(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

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
			{view === ''}
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
			{'monthly' === view && <MonthlyView />}
			{'weekly' === view && <WeeklyCalendar today={currentDate} />}
			{'daily' === view && <DailyView />}
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
