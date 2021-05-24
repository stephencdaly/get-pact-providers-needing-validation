const core = require('@actions/core');
const { canDeploy } = require('@pact-foundation/pact-node')

async function run () {
  try {
    const pactBroker = core.getInput('pact-broker-url')
    const pactBrokerUsername = core.getInput('pact-broker-username')
    const pactBrokerPassword = core.getInput('pact-broker-password')
    const consumer = core.getInput('consumer')
    const consumerTag = core.getInput('consumer-tag')

    core.setSecret(pactBrokerUsername)
    core.setSecret(pactBrokerPassword)

    core.info(`Checking whether consumer ${consumer} can be deployed`);

    const opts = {
      pactBroker,
      pactBrokerUsername,
      pactBrokerPassword,
      pacticipants: [{
        name: consumer,
        version: consumerTag
      }]
    }
    core.info(`Options: ${JSON.stringify(opts)}`)
    const result = await canDeploy(opts)

    core.info(`Result: ${JSON.stringify(result)}`)

    core.setOutput('providers-needing-validation', result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
