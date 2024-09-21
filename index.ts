// src/server.ts

import { serve } from 'bun';
import { itemRoutes } from './src/routes/itemRoute';

// Start the Bun server and route incoming requests to itemRoutes
const server = serve({
	fetch(req) {
		// Use the itemRoutes function to handle all requests
		return itemRoutes(req);
	},
	port: 3000, // Server will run on localhost:3000
});

console.log(`Listening on http://localhost:${server.port}`);
