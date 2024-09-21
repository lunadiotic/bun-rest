import { readJSONFile, writeJSONFile } from '../utils/fileUtils';
import type { Item } from '../models/itemModel';

const FILE_PATH = './data/db.json';

// Get all items
export const getAllItems = async (): Promise<Item[]> => {
	const data = await readJSONFile<{ items: Item[] }>(FILE_PATH);
	return data.items || [];
};

// Get item by ID
export const getItemById = async (id: string): Promise<Item | undefined> => {
	const data = await readJSONFile<{ items: Item[] }>(FILE_PATH);
	return data.items.find((item) => item.id === id);
};

// Create a new item
export const createItem = async (newItem: Omit<Item, 'id'>): Promise<Item> => {
	const data = await readJSONFile<{ items: Item[] }>(FILE_PATH);
	const item: Item = { id: Date.now().toString(), ...newItem };
	data.items.push(item);
	await writeJSONFile(FILE_PATH, data);
	return item;
};

// Update an item by ID
export const updateItem = async (
	id: string,
	updatedItem: Partial<Item>
): Promise<Item | null> => {
	const data = await readJSONFile<{ items: Item[] }>(FILE_PATH);
	const itemIndex = data.items.findIndex((item) => item.id === id);

	if (itemIndex === -1) return null;

	data.items[itemIndex] = { ...data.items[itemIndex], ...updatedItem };
	await writeJSONFile(FILE_PATH, data);
	return data.items[itemIndex];
};

// Delete an item by ID
export const deleteItem = async (id: string): Promise<boolean> => {
	const data = await readJSONFile<{ items: Item[] }>(FILE_PATH);
	const itemIndex = data.items.findIndex((item) => item.id === id);

	if (itemIndex === -1) return false;

	data.items.splice(itemIndex, 1);
	await writeJSONFile(FILE_PATH, data);
	return true;
};
