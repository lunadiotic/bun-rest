// Generic type `T` will allow this function to be flexible and work with any data type.
export const readJSONFile = async <T>(filePath: string): Promise<T> => {
	try {
		const data = await Bun.file(filePath).text();
		return JSON.parse(data) as T;
	} catch (error) {
		console.error('Error reading JSON file:', error);
		// Return an empty object casted to T, but this will vary depending on how you want to handle errors.
		return {} as T;
	}
};

// Generic type `T` will be used to write any type of data to the file.
export const writeJSONFile = async <T>(
	filePath: string,
	data: T
): Promise<void> => {
	try {
		await Bun.write(filePath, JSON.stringify(data, null, 2));
	} catch (error) {
		console.error('Error writing to JSON file:', error);
	}
};
