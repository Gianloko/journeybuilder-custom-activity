const FuelRest = require('fuel-rest');
const logger = require('../utils/logger');
const https = require('https');
const http = require('http');
const got = require('got');

const options = {
  auth: {
    clientId: process.env.SFMC_CLIENT_ID,
    clientSecret: process.env.SFMC_CLIENT_SECRET,
    authOptions: {
      authVersion: 2,
      accountId: process.env.SFMC_ACCOUNT_ID,
    },
    authUrl: `https://${process.env.SFMC_SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`,
  },
  origin: `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/`,
  globalReqOptions: {
  },
};

const client = new FuelRest(options);

/**
 * Save data in DE
 * @param externalKey
 * @param data
 * @returns {?Promise}
 */
const saveData = async (externalKey, data) => client.post({
  uri: `/hub/v1/dataevents/key:${externalKey}/rowset`,
  headers: {
    'Content-Type': 'application/json',
  },
  json: true,
  body: data,
});

const fetchPostData = async (postData) => {
	
    try {
		
        //const fetchResponse = await axios.post('https://en5kbmsv4ixvb0y.m.pipedream.net', postData);
		//logger.info(fetchResponse);
        //return fetchResponse;
		
		const fetchResponse = await got.post('https://en5kbmsv4ixvb0y.m.pipedream.net', postData).json();
		return fetchResponse.json();
		
		//logger.info(fetchResponse);
        //return fetchResponse;
		
		/**const data = JSON.stringify(postData);

		const options = {
		  hostname: 'en5kbmsv4ixvb0y.m.pipedream.net',
		  port: 443,
		  path: '/',
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'Content-Length': data.length
		  }
		}

		const req = https.request(options, res => {
		  res.on('data', d => {
			process.stdout.write(d)
		  })
		});

		req.on('error', error => {
		  logger.info(error)
		});

		req.write(data);
		req.end();**/
		
		
    } catch (e) {
		logger.info("catch error: " + e);
        return e;
    }
}

module.exports = {
  client,
  saveData,
  fetchPostData
};
