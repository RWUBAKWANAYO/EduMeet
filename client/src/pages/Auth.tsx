import React, { useContext } from 'react';
import { Login } from '../components/auth';
import authBackground from '../assets/images/authBackground.png';
import logo from '../assets/images/logo.png';
import { UIContext } from '../hooks/context/UIContext';
export const Auth: React.FC = () => {
	const { theme } = useContext(UIContext);
	return (
		<div className='w-full h-screen flex'>
			<div
				className={`w-[420px] min-h-screen p-8 ${
					theme === 'dark' ? 'bg-blue-700' : 'bg-white-100'
				}`}
			>
				<div className='w-full flex items-center mb-8'>
					<img src={logo} alt='logo' className='w-9' />
					<h1
						className={`text-md font-extrabold text-blue-40`}
					>
						EduMeet
					</h1>
				</div>
				<Login />
			</div>
			<div className='flex-1'>
				<img
					src={authBackground}
					alt='background'
					className='w-full h-full  object-right-bottom object-cover '
				/>
			</div>
		</div>
	);
};
