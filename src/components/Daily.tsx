import React from 'react';
import { format } from 'date-fns';
import { PiPlus } from 'react-icons/pi';
import { FaInstagramSquare, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

// Mock data for scheduled and posted events
const mockData = {
	scheduled: [{ time: '10', title: 'Meeting with Team' }],
	posted: [{ time: '11', title: 'Instagram Post: New Collection' }],
};

interface DailyViewProps {
	today: Date;
}

const getPostInfo = (time: number) => {
	const scheduledPost = mockData.scheduled.find(
		(post) => time === Number(post.time)
	);
	const postedContent = mockData.posted.find(
		(post) => time === Number(post.time)
	);

	if (scheduledPost) {
		return { type: 'Scheduled', content: scheduledPost };
	}
	if (postedContent) {
		return { type: 'Posted', content: postedContent };
	}
	return null;
};

const DailyView: React.FC<DailyViewProps> = ({ today }) => {
	// Create time slots dynamically (9:00 AM - 6:00 PM)
	const timeSlots = Array.from({ length: 10 }, (_, index) => index + 9);

	return (
		<div className="mx-auto w-full">
			{/* Display the date and day for today */}
			<div className="grid grid-cols-7">
				<div className=" border border-[#E6E6E6] h-[60px] flex items-start flex-col justify-center px-3 "></div>
				<div className="col-span-6 border border-[#E6E6E6] h-[60px] flex items-start flex-col justify-center px-3 ">
					<p className="text-center text-black text-[1rem]">
						{format(today, 'd MMM yyyy')}
					</p>
					<p className="text-center text-black text-sm">
						{format(today, 'EEE')}
					</p>
				</div>
			</div>

			{/* Time slots and event details grid */}
			{timeSlots.map((time) => {
				const postInfo = getPostInfo(time);

				return (
					<div key={time} className="grid grid-cols-7">
						{/* Time column */}
						<div className=" border h-[90px] border-[#E6E6E6] flex items-center justify-center cursor-pointer text-[#726E7A] font-[500] text-[14px]">
							<p>{`${time}:00 AM`}</p>
						</div>

						{/* Event column */}
						<div
							className={`border h-[90px] col-span-6 border-[#E6E6E6] flex items-center justify-center cursor-pointer ${
								postInfo
									? postInfo.type === 'Scheduled'
										? 'border-[#B4B0F5] border-2 bg-[#EFF0FF]'
										: 'border-l-[#FF5448] border-[4px] bg-[#FDEDE9]'
									: ''
							}`}
						>
							{postInfo ? (
								<>
									{postInfo.type === 'Scheduled' ? (
										<div className="flex justify-center gap-2 flex-col items-center w-full">
											<PiPlus className="text-gray-400 text-lg" />
											<p className="text-[#726E7A] text-sm text-center">
												Add Post: {postInfo.content.title}
											</p>
										</div>
									) : (
										<div className="flex flex-col items-center">
											<p className="text-sm text-gray-600 font-sans">
												{postInfo.content.title}
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
								<p className="text-gray-400 text-center"></p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DailyView;
