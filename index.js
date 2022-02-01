const core = require('@actions/core');
const axios = require('axios');
const uuid = require('uuid');

const main = async() => {
  try {
    let webhookID = core.getInput('webhook-id', {required: true});
    const httpMethod = core.getInput('method', {required: true}).toLowerCase();
    const silent = core.getInput('silent', {required: true}).toLowerCase() === 'true';
    const message = core.getInput('message', {required: false});

    webhookID = webhookID.split('/').filter((ID) => ID).join('/');
    webhookID = silent ? `${webhookID}/silent` : webhookID;
    const zapierURL = `https://hooks.zapier.com/hooks/catch/${webhookID}/`;
    console.log(`zapier url : ${zapierURL}`);

    let config = {
      method: httpMethod,
      url: zapierURL,
      headers: {
        'Content-Type': 'text/plain',
      },
    };
    if (httpMethod !== 'get' && (message !== '' || message !== undefined)) {
        config.data = message;
    }
    console.log(`webhook request params : ${JSON.stringify(config)}`);

    await axios(config).then(response => {
      if (![200, 201, 202, 204].includes(response.status)) {
        core.setFailed(`Failed to Zapier <<${httpMethod}>> - ${response.status}`);
      }
      core.setOutput('state', response.status);
      console.log(`Zapier http method and status ** ${httpMethod} - ${response.status} - ${JSON.stringify(response.data)} **`);
    }).catch(function (error) {
      core.setFailed(`Failed to Zapier <<${httpMethod}>> - ${error.message}`);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
