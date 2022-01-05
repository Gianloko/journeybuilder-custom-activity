const FuelRest = require('fuel-rest');
const logger = require('../utils/logger');

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

	const headers = new Headers()
	headers.append("Content-Type", "application/json")

    const settings = {
        method: 'POST',
        headers,
		mode: "cors",
		body: JSON.stringify(postData)
    };
	
    try {
        const fetchResponse = await fetch('https://en5kbmsv4ixvb0y.m.pipedream.net', settings);
        const data = await fetchResponse.json();
		logger.info(data);
        return data;
    } catch (e) {
		logger.info(e);
        return e;
    }
}

module.exports = {
  client,
  saveData,
  fetchPostData
};
