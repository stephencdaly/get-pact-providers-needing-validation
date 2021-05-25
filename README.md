# get-pact-providers-needing-validation

Action that takes a Pact consumer and version and outputs the providers that have not been verified against this consumer version.

Currently defines a DockerFile to build image for running action. This could be built and published to DockerHub to speed up exectution, but it only takes a few seconds to build so might not be necessary.

## Inputs

pact-broker-url:
  description: URL of the pact broker
  required: true
pact-broker-username:
  description: Pact broker username
  required: true
pact-broker-password:
  description: Pact broker password
  required: true
consumer:
  description: The pact consumer
  required: true
consumer-tag: 
  description: The tag for consumer pact file to check for providers needing validation against
  required: true
## Outputs

providers-needing-validation:
  description: 'List of providers needing validation against consumer version'
