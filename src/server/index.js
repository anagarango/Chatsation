const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');

// next.js configuration to use express
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler();
//

// ! line below is important
nextApp.prepare().then(() => {
	const app = express()
	app.use(bodyParser.json());

	app.get('/', (req, res) => {
		console.log("Getting stuff from home page");
		return nextApp.render(req, res, '/', req.query);
	})

	app.post('/api/message', (req, res) => {
		console.log(req.body)
		res.status(200).send(req.body);
	});

// ! and apparently this line below too which handles all routes
	app.get('*', (req, res) => {
		return handle(req, res)
	})

	const port = 3000

	app.listen(port, () => {
		console.log('server is listening on port', port)
	})
});