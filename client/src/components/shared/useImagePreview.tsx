import { useState } from 'react';

export const useImagepreview = () => {
	const [preview, setpreview] = useState<string | null>(null);

	const handleImageChange = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setpreview(imageUrl);
		}
	};

	return {
		preview,
		handleImageChange,
	};
};
