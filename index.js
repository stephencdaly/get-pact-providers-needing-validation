const core = require('@actions/core');
const { canDeploy } = require('@pact-foundation/pact')

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
      participant: consumer,
      participantVersion: consumerTag
    }
    const result = await canDeploy(opts)

    core.info(`Result: ${JSON.stringify(result)}`)

    core.setOutput('providers-needing-validation', result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
