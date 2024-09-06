'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BiPlus } from 'react-icons/bi';
import { GoChevronDown } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa6';
import { RiTwitterXFill } from 'react-icons/ri';
import { GoClock } from 'react-icons/go';
import { FaRegBell } from 'react-icons/fa6';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';

const Topbar = () => {
	const [postModal, setPostModal] = useState<boolean>(false);
	return (
		<div className="w-full p-4  flex justify-between">
			<div className="flex gap-2 items-center">
				<div className="flex">
					<div className="avatar-group -space-x-4 rtl:space-x-reverse">
						<div className="avatar border-0">
							<div className="w-12 border">
								<Image
									alt="Profile pic"
									src={
										'https://cdn.pixabay.com/photo/2024/05/04/01/25/white-tailed-eagle-8738135_1280.jpg'
									}
									width={20}
									height={20}
									className="rounded-full w-10 h-10 shadow-green-50 shadow-md object-center object-cover"
									loading="lazy"
								/>
							</div>
						</div>
						<div className="avatar border-0">
							<div className="w-12">
								<Image
									alt="Profile pic"
									src={
										'https://cdn.pixabay.com/photo/2024/05/04/01/25/white-tailed-eagle-8738135_1280.jpg'
									}
									width={50}
									height={50}
									className="rounded-full w-10 h-10 shadow-green-50 shadow-md object-center object-cover"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<p className="text-black font-bold text-[1rem]">Hey Andrew Jobss</p>
					<p className="text-[#717171] text-[11px]">
						Lets Post something extraodinary today
					</p>
				</div>
			</div>

			<div className="flex gap-[.8px] items-center">
				<div
					className="flex text-white bg-[#5E17EB] px-4 py-2 h-[2.5rem] gap-2 text-[1rem] rounded-tl-md rounded-bl-md items-center"
					onClick={() => setPostModal(true)}
				>
					<BiPlus className="text-[1.3rem]" />
					<span>Schedule post</span>
				</div>
				<div className="flex text-white   bg-[#5E17EB] px-4  gap-2 text-[1rem] h-[2.5rem] rounded-tr-md rounded-br-md items-center">
					<GoChevronDown />
				</div>
			</div>

			{postModal && (
				<div className="modal modal-open bg-white ">
					<div className="modal-box bg-white w-[27vw] p-0  relative flex flex-col gap-2">
						<div
							onClick={() => {
								setPostModal(false);
							}}
							className="text-[#4B4652] absolute top-[3%] right-[3%] bg-[#F2F2F2] h-[30px] w-[30px] flex justify-center items-center rounded-full shadow-sm p-1"
						>
							<RxCross1 className=" text-[1rem] " />
						</div>
						<div className="flex items-center px-5 mt-4 justify-start gap-4">
							<div className="w-[2.2rem] relative">
								<Image
									width={20}
									height={20}
									alt="text"
									className="object-cover object-center w-[2.2rem] rounded-full"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
								/>
								<FaInstagramSquare className="absolute text-red-500 -top-[18%] text-sm -right-[18%]" />
							</div>
							<div>
								<p className="text-[#1A1626] text-[14px] font-[700] ">
									North Face
								</p>
								<p className="text-[#1A1626] text-[14px] font-[500] ">
									2 Post Scheduled
								</p>
							</div>
						</div>
						<div className="grid grid-cols-5 ">
							<div className="border-b-[2px] flex justify-center items-center p-3  bg-[#FFF6F0] border-[#FE7263] ">
								<FaInstagramSquare className="text-[1.5rem] text-red-500" />
							</div>
							<div className="flex justify-center items-center p-3">
								<FaLinkedin className="text-[1.5rem] text-[#0A66C2]" />
							</div>
							<div className="flex justify-center items-center p-3">
								<FaFacebook className="text-[1.5rem] text-[#0A66C2]" />
							</div>
							<div className="flex justify-center items-center p-3">
								<RiTwitterXFill className="text-black text-[2rem]" />
							</div>
							<div className="flex justify-center items-center p-3">
								<FaFacebook className="text-[1.5rem] text-[#0A66C2]" />
							</div>
						</div>

						<div className="flex flex-col px-5 py-1 gap-2">
							<div className="flex justify-between items-center">
								<div className="flex gap-2 items-center bg-gray-200 px-3 py-1 rounded-md">
									<div className="flex items-center gap-2">
										<RiCalendarScheduleLine className="text-[14px] font-bold text-[#4B4652]" />
										<p className="text-[14px] font-bold text-[#4B4652]">
											Friday 5,Aug
										</p>
									</div>
									<div className="flex items-center gap-2">
										<GoClock className="text-[14px] font-bold text-[#4B4652]" />
										<p className="text-[14px] font-bold text-[#4B4652]">
											2:35 pm
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="flex items-center gap-2">
										<FaRegBell className="text-[14px] font-bold text-[#4B4652]" />
										<p className="text-[14px] font-semibold text-[#4B4652]">
											on
										</p>
									</div>
									<div className="flex items-center gap-2">
										<HiOutlineChatBubbleOvalLeftEllipsis className="text-[14px] font-bold text-[#4B4652]" />
										<p className="text-[14px] font-semibold text-[#4B4652]">
											off
										</p>
									</div>
								</div>
							</div>

							<div
								className="flex bg-cover bg-center p-2 w-full h-[150px] rounded-md bg-blend-saturation  "
								style={{
									backgroundImage:
										'url(https://cdn.pixabay.com/photo/2016/11/02/11/08/monk-1791113_640.jpg)',
								}}
							>
								<Image
									width={20}
									height={20}
									alt="text"
									className="object-contain w-full h-full object-center"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
								/>
							</div>
							<button className="self-start text-[#2BA631] text-sm border-[1px] border-[#79DC78] bg-[#DEF8DD] p-1 px-3 rounded-sm">
								#Hiring
							</button>

							<div className="flex flex-col items-start gap-1">
								<p className="text-[1rem] text-[#34303B] font-semibold">
									We are hiring Content Craters
								</p>
								<p className="text-sm text-[#34303B] text-start">
									Choosing the right draft is crucial for ensuring your content
									meets the highest standards. Begin by selecting one of your
									drafts that best aligns with your goals, then click 'Import'
									ensure it’s ready for final review,{' '}
									<span className="text-[#5E17EB]">
										#hoou #time #and #enhancing #quality.
									</span>
								</p>
								<button className="bg-[#E0E0FF] p-1 px-3 rounded-md text-[#34303B] text-[14px] font-[500]">
									Patna , Bihar India
								</button>
							</div>
						</div>
						<div className="flex p-1 px-5 justify-between w-full py-4 border-[1px]">
							<div className="flex gap-4 items-center">
								<button className="border-[#E6E6E6] border-[1px] h-[24px] w-[24px] flex justify-center items-center rounded-md shadow-sm ">
									<FaChevronLeft className="text-[#4B4652] text-sm" />
								</button>
								<p className="text-[#1A1626] font-[500] text-[14px]">1</p>
								<button className="border-[#E6E6E6] border-[1px] h-[24px] w-[24px]  flex justify-center items-center rounded-md shadow-sm ">
									<FaChevronRight className="text-[#4B4652] text-sm" />
								</button>
							</div>
							<button className="border-[#E6E6E6] flex items-center gap-2 border-[2px] px-2 py-1 rounded-md text-[#4B4652] capitalize text-[.825rem]">
								<RiDeleteBin6Line />
								<p>Delete</p>
							</button>{' '}
							<button className="border-[#E6E6E6] flex items-center gap-2 border-[2px] px-2 py-1 rounded-md text-[#4B4652] capitalize text-[.825rem]">
								<CiEdit />
								<p>Edit</p>
							</button>{' '}
							<button className="border-[#E6E6E6] border-[2px] px-2 py-1 rounded-md text-[#4B4652] capitalize text-[.825rem]">
								Post Now
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Topbar;
