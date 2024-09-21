import {
	getAllItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
} from '../controllers/itemController';
import type { Item } from '../models/itemModel';

export const itemRoutes = async (req: Request): Promise<Response> => {
	const { method } = req;

	// Use URL constructor to parse the URL and extract the pathname
	const url = new URL(req.url);
	const pathname = url.pathname; // e.g., "/api/items/123"
	const segments = pathname.split('/').filter(Boolean); // Filter out empty strings

	// Destructure the segments
	const [apiPrefix, resource, id] = segments;

	console.log(`Method: ${method}, Route: ${apiPrefix}/${resource}, ID: ${id}`);

	// Check if prefix is 'api' and resource is 'items'
	if (apiPrefix !== 'api' || resource !== 'items') {
		return new Response(JSON.stringify({ message: 'Not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	switch (method) {
		case 'GET':
			if (id) {
				console.log('Get item by ID:', id);
				const item = await getItemById(id);
				return new Response(
					JSON.stringify(item || { message: 'Item not found' }),
					{
						status: item ? 200 : 404,
						headers: { 'Content-Type': 'application/json' },
					}
				);
			} else {
				console.log('Get all items');
				const items = await getAllItems();
				return new Response(JSON.stringify(items), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

		case 'POST':
			const newItemData = await req.json();
			const newItem = await createItem(newItemData as Omit<Item, 'id'>);
			return new Response(JSON.stringify(newItem), {
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			});

		case 'PUT':
			if (!id) {
				return new Response(JSON.stringify({ message: 'ID is required' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const updatedData = await req.json();
			const updatedItem = await updateItem(id, updatedData as Partial<Item>);
			return new Response(
				JSON.stringify(updatedItem || { message: 'Item not found' }),
				{
					status: updatedItem ? 200 : 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);

		case 'DELETE':
			if (!id) {
				return new Response(JSON.stringify({ message: 'ID is required' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const isDeleted = await deleteItem(id);
			return new Response(
				JSON.stringify({
					message: isDeleted ? 'Item deleted' : 'Item not found',
				}),
				{
					status: isDeleted ? 200 : 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);

		default:
			return new Response(JSON.stringify({ message: 'Method not allowed' }), {
				status: 405,
				headers: { 'Content-Type': 'application/json' },
			});
	}
};
