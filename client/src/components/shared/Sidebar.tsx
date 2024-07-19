import { useContext } from "react";
import { Link } from "react-router-dom";
import {
	ChartIcon,
	ClockIcon,
	DarkIcon,
	DateIcon,
	HomeIcon,
	InviteClose,
	LightIcon,
	SettingIcon,
} from "../../assets/icons";
import logo from "../../assets/images/logo.png";
import { UIContext } from "../../hooks/context/UIContext";
import { MeetingToAnalyze } from "../analytics/MeetingsToAnalyze";

export const Sidebar: React.FC = () => {
	const { theme, toggleTheme, activePage, openModal, isMobile, toggleSidebar } =
		useContext(UIContext);

	const links = [
		{
			title: "Home",
			path: "/",
			icon: HomeIcon,
		},
		{
			title: "Meetings",
			path: "/meetings",
			icon: ClockIcon,
		},
		{
			title: "Schedule",
			path: "/meetings/new",
			icon: DateIcon,
		},
		{
			title: "Invitations",
			path: "/invitations",
			icon: InviteClose("size-5"),
		},
		{
			title: "Analytics",
			path: "#",
			icon: ChartIcon(),
		},
	];

	const otherLinks = [
		{
			title: theme === "dark" ? "Light" : "Dark",
			path: "#",
			icon: theme === "dark" ? LightIcon : DarkIcon,
			onclick: () => toggleTheme(),
		},
		{
			title: "Settings",
			path: "/settings",
			icon: SettingIcon,
		},
	];

	const analyzeHandler = () => {
		openModal(<MeetingToAnalyze />);
		isMobile && toggleSidebar();
	};

	return (
		<div className="h-full flex flex-col items-center w-full">
			<div className="mb-10 w-full h-[60px] flex justify-center items-center   ">
				<Link to="/">
					<img src={logo} alt="logo" className="w-8" />
				</Link>
			</div>
			<ul className="w-full px-4">
				{links.map((link) => (
					<li key={link.title} className="mb-4">
						<Link
							to={link.path}
							title={link.title}
							onClick={() => (link.title === "Analytics" ? analyzeHandler() : toggleSidebar())}
							className={`flex items-center p-1.5 rounded-md gap-x-2 ${
								theme === "dark"
									? `${
											activePage === link.title
												? "bg-blue-100 text-white-100"
												: "text-white-500 border border-transparent-0 hover:bg-gray-900  hover:border-blue-400 hover:text-white-300 "
									  }`
									: `${
											activePage === link.title
												? "bg-blue-100 text-white-100"
												: "text-black-400 border border-transparent-0 hover:bg-white-700 hover:border-gray-800 hover:text-blue-700"
									  }`
							}`}
						>
							{link.icon}
							<p className="text-xs flex sm:hidden lg:flex font-semibold">{link.title}</p>
						</Link>
					</li>
				))}
			</ul>
			<div className="mt-auto mb-4  w-full px-4 flex flex-col justify-center space-y-4">
				{otherLinks.map((link) => (
					<Link
						key={link.title}
						to={link.path}
						title={link.title}
						className={` flex items-center p-1.5 rounded-md gap-x-2  ${
							theme === "dark"
								? "text-white-800 bg-gray-900 border border-blue-400 hover:text-white-100 "
								: "text-black-400 bg-white-700 border border-gray-800 hover:text-blue-700 "
						}`}
						onClick={link.onclick && link.onclick}
					>
						{link.icon}
						<p className="text-xs flex sm:hidden lg:flex font-semibold">{link.title}</p>
					</Link>
				))}
			</div>
		</div>
	);
};
