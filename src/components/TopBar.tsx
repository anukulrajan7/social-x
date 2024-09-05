import React from 'react';
import Image from 'next/image';
import { BiPlus } from 'react-icons/bi';
import { GoChevronDown } from 'react-icons/go';

const Topbar = () => {
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
				<div className="flex text-white bg-[#5E17EB] px-4 py-2 h-[2.5rem] gap-2 text-[1rem] rounded-tl-md rounded-bl-md items-center">
					<BiPlus className="text-[1.3rem]" />
					<span>Schedule post</span>
				</div>
				<div className="flex text-white   bg-[#5E17EB] px-4  gap-2 text-[1rem] h-[2.5rem] rounded-tr-md rounded-br-md items-center">
					<GoChevronDown />
				</div>
			</div>
		</div>
	);
};

export default Topbar;
