import React, { useContext, useState } from "react";
import { Login, Signup } from "../components/auth";
import authBackground from "../assets/images/authBackground.png";
import logo from "../assets/images/logo.png";
import { UIContext } from "../hooks/context/UIContext";
export const Auth: React.FC = () => {
	const { theme } = useContext(UIContext);
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const pageHandler = () => setIsLogin(!isLogin);

	return (
		<div className="w-full sm:h-screen h-full flex flex-col-reverse sm:flex-row">
			<div
				className={`sm:w-[350px] md:w-[420px] w-full  sm:h-screen h-fit px-8 py-8  overflow-auto ${
					theme === "dark" ? "bg-blue-700" : "bg-white-100"
				}`}
			>
				<div className="w-full flex items-center mb-6 space-x-2">
					<img src={logo} alt="logo" className="w-9" />
					<h1
						className={`text-xl leading-none font-extrabold flex-1 text-center ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						{!isLogin ? "Create an Account" : "Signin to your Account"}
					</h1>
				</div>
				{isLogin && <Login pageHandler={pageHandler} />}
				{!isLogin && <Signup pageHandler={pageHandler} />}
			</div>
			<div className="flex-1 bg-blue-40">
				<img
					src={authBackground}
					alt="background"
					className="w-full sm:h-full h-52  object-right-bottom object-cover "
				/>
			</div>
		</div>
	);
};
