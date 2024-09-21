const server = Bun.serve({
	port: 3001,
	fetch(request) {
		return new Response('Welcome to Bun!');
	},
});

console.log(`Listening on http://localhost:${server.port}`);
