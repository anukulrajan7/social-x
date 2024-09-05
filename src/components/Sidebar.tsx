'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { GoChevronDown } from 'react-icons/go';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { GoInbox } from 'react-icons/go';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';

interface Link {
	icon: React.ComponentType; // Use this type for icon components
	name: string;
}

// Array of links with icons and names
const SideLink: Link[] = [
	{
		icon: RiCalendarScheduleLine,
		name: 'Scheduler',
	},
	{
		icon: AiOutlineThunderbolt,
		name: 'Channels',
	},
	{
		icon: GoInbox,
		name: 'Inbox',
	},
	{
		icon: TbBrandGoogleAnalytics,
		name: 'Analytics',
	},
];
interface SidebarProps {
	children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
	const router = useRouter();

	return (
		<div className="flex h-[90vh]">
			{/* Sidebar */}
			<div className="w-[24%] bg-white shadow-md shadow-gray-700 border-orange-500 h-full p-6 flex flex-col justify-between">
				<div className="flex gap-3 flex-col items-start">
					<button
						className="border-[2px] shadow-sm shadow-[#E6E6E6] bg-white rounded-[5px] border-[#E6E6E6] hover:bg-white  flex justify-between items-center px-4 py-2 w-full
                    "
					>
						<div className="flex items-center gap-2">
							<div className="avatar">
								<div className="w-[2.2rem] rounded-full">
									<Image
										width={20}
										height={20}
										alt="text"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<p className="font-sans text-[#000000] font-[500]">
								The North Face
							</p>
						</div>
						<span className="bg-[#e2e4fe] p-1 rounded-md">
							<GoChevronDown className="text-[#5E17EB]" />
						</span>
					</button>
					<button
						className="transition-all duration-300 py-2 px-4 rounded flex text-[#4B4652] items-center gap-2"
						onClick={() => router.push('#')}
					>
						<BsArrowLeftShort className="text-[1.5rem]" />
						<span>Back to menu</span>
					</button>
					<div className="h-[1px] mx-2 w-full bg-[#ECECEC]"></div>
					<div className=" flex flex-col gap-1  w-full px-4">
						<p className="text-[#726E7A] font-[500] ml-2 text-[.925rem] my-1 mb-3">
							Social Media
						</p>
						{SideLink.map((item, index) => {
							return (
								<div
									key={index}
									className={`flex items-center justify-between mx-3 gap-3 h-[3.5rem]  ${
										index === 0
											? 'text-[#5E17EB]  bg-[#F7F7FF]'
											: 'text-[#34303B]'
									} w-full mb-3   text-lg font-[500] rounded-md`}
								>
									<div className="flex gap-3 items-center px-3">
										<item.icon></item.icon>
										<p>{item.name}</p>
									</div>
									{index === 0 && (
										<div className="h-[90%] w-1 rounded-md  bg-[#5E17EB]"></div>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div
					className={`flex items-center justify-start mx-6 gap-3 h-[3.5rem]  
									text-[#34303B] w-full mb-3   text-lg font-[500] rounded-md`}
				>
					<RiDeleteBin6Line />
					<p>Recent Deletes</p>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-grow bg-gray-100">
				<div className=" animate-fadeIn transition-all duration-500">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
