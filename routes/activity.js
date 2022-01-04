const { v1: Uuidv1 } = require('uuid');
const https = require('https');
const JWT = require('../utils/jwtDecoder');
const SFClient = require('../utils/sfmc-client');
const logger = require('../utils/logger');

/**
 * The Journey Builder calls this method for each contact processed by the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.execute = async (req, res) => {
  // decode data
  const data = JWT(req.body);

  logger.info(data);
  logger.info("before try/catch");
  
  logger.info(data.inArguments[0].contactKey);
  logger.info(data.inArguments[0].eventField);
  logger.info(data.inArguments[0].textField);
  logger.info(data.inArguments[0].dateField);

  try {
    
	const id = Uuidv1();
	
	const dataToSend = JSON.stringify(data);

	const options = {
	  hostname: 'en5kbmsv4ixvb0y.m.pipedream.net',
	  port: 443,
	  path: '/',
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Content-Length': dataToSend.length
	  }
	}

	const req = https.request(options, res => {
	  logger.info(`statusCode: ${res.statusCode}`)

	  res.on('data', d => {
		process.stdout.write(d);
	  })
	})

	req.on('error', error => {
	  logger.error(error);
	})

	req.write(dataToSend);
	req.end();
	
	logger.info("end of request");
		
    /**await SFClient.saveData(process.env.DATA_EXTENSION_EXTERNAL_KEY, [
      {
        keys: {
          Id: id,
          SubscriberKey: data.inArguments[0].contactKey,
        },
        values: {
          Event: data.inArguments[0].DropdownOptions,
          Text: data.inArguments[0].Text,
        },
      },
    ]);**/
	
  } catch (error) {
	logger.error("there is an error:");
    logger.error(error);
  }

  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */
exports.publish = (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */
exports.validate = (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};
