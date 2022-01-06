const FuelRest = require('fuel-rest');
const logger = require('../utils/logger');
const https = require('https');
const http = require('http');

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
	
	/** const options = {
	  hostname: 'en5kbmsv4ixvb0y.m.pipedream.net',
	  port: 443,
	  path: '/',
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Content-Length': JSON.stringify(postData).length
	  }
	} 
	
	return await doPostCallout(options, JSON.stringify(postData));
	
	**/
	
	const arrayData = [
		{
			"previewTitle": "preview title from Marketing Cloud",
			"previewBody": "preview body from Marketing Cloud",
			"payloadTitle": "payload title from Marketing Cloud",
			"payloadBody": "payload body from Marketing Cloud",
			"payloadImage": "https://picsum.photos/200/300",
			"payloadRedirectUrl": "https://www.alpitour.it/",
			"notificationTag": "DOCUMENTI",
			"userCode" : "2020_43800",
			"userSource": "APP"
		}
	];
	
	const authenticationHeader = 'Basic ' + Buffer.from('appmyaw' + ':' + 'Q6e^4sH#t!Rq').toString('base64');
	
	logger.info('auth header: ' + authenticationHeader);
	
	const options = {
	  hostname: 'apitest.easybook.it',
	  path: '/ms-notification/v1/notification/send',
	  method: 'POST',
	  headers: {
		'Accept'         : '*/*',
		'Connection'     : 'keep-alive',
		'Content-Type'   : 'application/json',
		'Content-Length' : JSON.stringify(arrayData).length,
		'Authorization'  : authenticationHeader
	  }
	}
	
	return await doPostCallout(options, JSON.stringify(arrayData));
}

const doPostCallout = (options, data) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data)
    req.end();
  });
}

module.exports = {
  client,
  saveData,
  fetchPostData
};
