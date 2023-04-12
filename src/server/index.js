const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const app = express()
var { createServer } = require('http')
var { Server } = require('socket.io')
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// next.js configuration to use express
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler();
//

app.use(bodyParser.json());

// io.on('connection', (socket) => {
  // socket.on('message', (data) => {
  //   console.log('message received:', data);
  //   io.emit('message', data); // broadcast the message to all connected clients
  // });
// });

// ! line below is important
nextApp.prepare().then(() => {

	app.get('/', (req, res) => {
		console.log("Getting stuff from home page");
		return nextApp.render(req, res, '/', req.query);
	})

	app.post('/api/message', (req, res) => {
		io.emit('message', req.body)
		res.status(200).send("Message Received");
	});

// ! and apparently this line below too which handles all routes
	app.get('*', (req, res) => {
		return handle(req, res)
	})

	const port = 3000

	httpServer.listen(port, () => {
		console.log('server is listening on port', port)
	})
});