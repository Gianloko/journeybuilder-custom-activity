const { v1: Uuidv1 } = require('uuid');
const https = require('https');
const JWT = require('../utils/jwtDecoder');
const SFClient = require('../utils/sfmc-client');
const logger = require('../utils/logger');
const http = require('http');

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
  
  try {
    
	const id = Uuidv1();
	
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	var postData = JSON.stringify(data);

	var options = {
	  hostname: 'en5kbmsv4ixvb0y.m.pipedream.net',
	  port: 443,
	  path: '/',
	  method: 'POST',
	  headers: {
		   'Content-Type': 'application/json',
		   'Content-Length': postData.length
	 }
	};

	var req = https.request(options, (res) => {
	  console.log('statusCode:', res.statusCode);
	  console.log('headers:', res.headers);

	  res.on('data', (d) => {
		process.stdout.write(d);
	  });
	});

	req.on('error', (e) => {
	  console.error(e);
	});

	req.write(postData);
	req.end();
	
	logger.info(dataResponse);
	
	logger.info("end of request");
	
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
