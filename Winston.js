const winston = require('winston');

const logConfiguration = {

	transports: [		new winston.transports.File({

			filename: 'logs/example.log',

		}),

	],

};

const logger = winston.createLogger(logConfiguration);
