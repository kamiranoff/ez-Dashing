import RestClient from 'js/client/RestClient.jsx';

class SonarClient {}

SonarClient.getSummaryInfos = function (projectKey, callback, errorCallback) {
  let path = "/api/sonar/summary?projectKey=" + encodeURIComponent(projectKey);
  RestClient.get(path, (json) => {
    callback(json[0]);
  }, errorCallback);
};

export default SonarClient;

