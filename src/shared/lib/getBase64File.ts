export const GetBase64File = (
	file: File
): Promise<string | ArrayBuffer | null> => {
	return new Promise((resolve) => {
		let baseURL: string | ArrayBuffer | null = '';
		// Make new FileReader
		const reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// on reader load something...
		reader.onload = () => {
			// Make a fileInfo Object
			baseURL = reader.result;
			resolve(baseURL);
		};
	});
};
