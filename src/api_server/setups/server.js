const { API_HOST, API_PORT, logger } = require("./config");

const secrets = require("./secrets");
const fs = require("fs");
const https = require("https");

function setup() {
  if (secrets.get("HTTPS_KEY_FILE" && secrets.get("HTTPS_CERT_FILE"))) {
    return {
      key: fs.readFileSync(secrets.get("HTTPS_KEY_FILE")),
      cert: fs.readFileSync(secrets.get("HTTPS_CERT_FILE"))
    };
  }
}

function start(app, options) {
  if (options) {
    return require('https').createServer(options, app);
  }
  return require('http').createServer(app);
}

function create(app) {
  var options = setup();
  http_server = start(app, options).listen(API_PORT, API_HOST);
  logger.info(`API server (v ${API_VERSION}) running on https://${API_HOST}:${API_PORT}`);
  return http_server
}

module.exports = {
  create
}
