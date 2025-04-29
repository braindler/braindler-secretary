const Metrics = require('./Metrics');

/**
 * Get data from metrics, and send it to the monitoring system.
 */
function call($json){
  let metrics = Metrics.call($json);
  console.log("Sending data to monitoring system:", metrics);
  return metrics;
}

module.exports = {
    call
}