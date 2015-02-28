export function initialize(container, application) {
  application.inject('route', 'azureService', 'service:azure');
  application.inject('controller', 'azureService', 'service:azure');
}

export default {
  name: 'azure-service',
  initialize: initialize
};
