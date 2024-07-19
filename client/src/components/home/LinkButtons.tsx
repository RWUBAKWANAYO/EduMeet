import { useContext } from "react";
import { CommonButton } from "../shared/buttons";
import { useNavigate } from "react-router-dom";
import { CameraIcon, DateIcon, PlusCircleIcon } from "../../assets/icons";
import { UIContext } from "../../hooks/context/UIContext";
import { useMeetings } from "../meetings/useMeetings";

export const LinkButtons = () => {
	const { theme } = useContext(UIContext);
	const navigate = useNavigate();
	const { clickHandler } = useMeetings();

	const cardsData = [
		{
			title: "Instant Meeting",
			description: "Setup new meeting",
			bgcolor: "bg-orange-400",
			icon: CameraIcon,
			onClick: () => clickHandler({ meetingType: "instant" }),
		},
		{
			title: "Join Meeting",
			description: "Via invitation link",
			bgcolor: "bg-blue-100",
			icon: PlusCircleIcon,
			onClick: () => navigate(`/join-meeting`),
		},
		{
			title: "Schedule Meeting",
			description: "Plan your meeting",
			bgcolor: "bg-blue-100",
			icon: DateIcon,
			onClick: () => navigate("/meetings/new"),
		},
	];

	return (
		<div className=" w-full h-fit grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1  gap-3 ">
			{cardsData.map((card) => (
				<div
					className={`flex flex-col items-center border p-4 rounded-md ${
						theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
					}`}
				>
					<CommonButton
						type="button"
						children={card.icon}
						hasUniqueColor={`
           ${card.bgcolor} text-white-100  border-transparent-200
          `}
						extraClass="mb-4 w-fit h-fit p-2"
						onClickHandler={card.onClick}
					/>

					<h4
						className={` text-xs font-medium font-semi-bold text-center ${
							theme === "dark" ? "text-white-800 " : "text-black-600"
						}`}
					>
						{card.title}
					</h4>
				</div>
			))}
		</div>
	);
};
