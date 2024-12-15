import express from 'express';
import figlet from 'figlet';
import { config } from './config';
import cors from 'cors';
import bodyparser from 'body-parser';

import { dataStream } from './dataStream';

const app = express();

const logger = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	console.log(
		figlet.textSync('BSC LIQUIDITY SNIPER 👋', {
			font: 'Larry 3D 2',
			horizontalLayout: 'default',
			verticalLayout: 'default',
		})
	);
	console.log(
		`${req.method} ${req.protocol}://${req.get('host')}${
			req.originalUrl
		} [${new Date().toLocaleString()}]`
	);
	next();
};

// CONFIG
if (
	!config.APP.PORT &&
	config.APP.NODE_ENV! !== 'production' &&
	!config.PANCAKESWAP.PROVIDER
) {
	const dotenv = require('dotenv');
	dotenv.config({ path: '../.env' });
	app.use(logger);
	throw new Error('PORT, NODE_ENV are not defined');
}

// CORS
var corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 200,
	credentals: true,
};

// APP MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(logger);

// STREAMING DATA
// dataStream(); TODO - Uncomment this line to start the data stream

// ROUTES
app.get('/', async (req: express.Request, res: express.Response) => {
	res.status(200).json({
		success: true,
		message: figlet.textSync('BSC LIQUIDITY SNIPER 👋', {
			font: 'Small',
			horizontalLayout: 'default',
			verticalLayout: 'default',
		}),
	});
});

import './routes';

app.use('*', (req: express.Request, res: express.Response) => {
	res.status(404).json({
		success: false,
		message: 'API Not Found',
	});
});

export { app };
