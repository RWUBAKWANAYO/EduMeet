import './waitingSpinner.css';
export const WaitingSpinner = () => {
	return (
		<div className='lds-spinner'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export const SubmittingSpinner = ({ colors, size }: { colors: string; size: string }) => (
	<div
		className={`w-full h-full absolute top-0 left-0 rounded-md flex items-center justify-center ${colors}`}
	>
		<div className={`${size}`}>
			<span className='loader'></span>
		</div>
	</div>
);
