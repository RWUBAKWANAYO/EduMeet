import { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";

export const MessageDisplay = ({
	message = "",
	hasBackground = false,
	height = "h-full",
	styles = {},
}: {
	message?: any;
	hasBackground?: boolean;
	height?: string;
	styles?: React.CSSProperties;
}) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={`w-full flex items-center justify-center p-4 ${
				hasBackground
					? `border rounded-lg ${
							theme === "dark"
								? "bg-blue-800 border-transparent-90"
								: "bg-white-100 border-gray-800"
					  }`
					: ""
			} ${height}
    }`}
			style={styles}
		>
			<span
				className={`text-xs w-fit text-center ${
					theme === "dark" ? "text-white-800" : "text-black-600"
				}`}
			>
				{message}
			</span>
		</div>
	);
};
