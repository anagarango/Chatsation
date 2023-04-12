const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const app = express()
var { createServer } = require('http')
var { Server } = require('socket.io')
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const mongoose = require('mongoose')
const MessageModel = require('../../models/messageModel')

require('dotenv').config();





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

	app.get('/', async (req, res) => {
		console.log("Getting stuff from home page");
		res.status(200);
		return nextApp.render(req, res, '/', req.query);
	})

	app.get('/api/message', async (req, res) => {
		const retrievedMessages = await MessageModel.find({})
		res.status(200).json(JSON.parse(JSON.stringify(retrievedMessages)))
	});

	app.post('/api/message', async (req, res) => {
		var message = new MessageModel(req.body)

		await message.save()
			.then(()=>{
				io.emit('message', req.body)
				res.status(200).send("Message Received");
				console.log("SAVED")
			})
			.catch((err)=>{
				return console.log(err)
			})
	});

	app.get('/api/message/:user', async (req, res) => {
		const user = req.params.user;
		
		const retrievedMessages = await MessageModel.find({ name: user })
		res.status(200).json(JSON.parse(JSON.stringify(retrievedMessages)))
	});

// ! and apparently this line below too which handles all routes
	app.get('*', (req, res) => {
		return handle(req, res)
	})

	mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

	mongoose.connection
		.on("open", () => console.log("SUCCESS CONNECTION TO MONGOOSE"))
		.on("close", () => console.log("ERROR CONNECTION TO MONGOOSE"))
		.on("error", (error) => console.log(error))

	const port = 3000
	httpServer.listen(port, () => {
		console.log('server is listening on port', port)
	})
});