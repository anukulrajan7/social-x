import React from 'react';
import { BiDownArrow, BiInfoCircle, BiSearch } from 'react-icons/bi';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { GoChevronDown } from 'react-icons/go';

const Navbar = () => {
	return (
		<div
			className="navbar bg-[#2A0476] flex justify-between
"
		>
			<div className="flex w-[25%]">
				<a className="btn btn-ghost text-xl">Social X</a>
			</div>
			<div className="flex space-x-7 ">
				<div className="input input-bordered w-[40vw] flex justify-between  items-center rounded-xl bg-[#13023F] placeholder:text-[#CCCCCC]">
					<input type="text" placeholder="Search Brandspace" />
					<BiSearch className="text-[#CCCCCC] text-lg" />
				</div>
				<a href="#">Home</a>
				<div className="dropdown">
					<div tabIndex={0} role="button" className="flex items-center gap-1">
						<span>Tools</span> <GoChevronDown />
					</div>
				</div>
			</div>
			<div className="flex justify-end w-[28%] pr-3 gap-5">
				<p className="flex items-center gap-1">
					<span className="text-[.9rem]">Need Help</span>
					<BiInfoCircle />
				</p>
				<HiOutlineBellAlert className="text-lg" />
				<div className="dropdown dropdown-end">
					<div className="flex items-center bg-slate-900 rounded-full pr-3 h-9 justify-start gap-1">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar "
						>
							<div className="w-7 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
								/>
							</div>
						</div>
						<GoChevronDown />
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
