const FuelRest = require('fuel-rest');
const logger = require('../utils/logger');
const axios = require('axios').default;

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
		
        const fetchResponse = await axios.post('https://en5kbmsv4ixvb0y.m.pipedream.net', postData);
		
		logger.info(fetchResponse);
        return fetchResponse;
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
