const fs = require('fs');

/**
 * Collect and send metrics.
 */
function call($json){
  const metricsFilePath = 'metrics.json';
  let currentMetrics = {};

  // Check if the file exists
  if (fs.existsSync(metricsFilePath)) {
    // Read existing metrics from the file
    const metricsData = fs.readFileSync(metricsFilePath, 'utf8');
    try {
      currentMetrics = JSON.parse(metricsData);
    } catch (err) {
      console.error('Error parsing metrics file:', err);
    }
  }

  // Define the metric types and their default values
  const metricTypes = {
    totalMessages: 0,
    totalErrors: 0,
    totalCommands: 0
  };

  // Initialize new metric types if they do not exist
  for (const type in metricTypes) {
    if (!currentMetrics[type]) {
      currentMetrics[type] = metricTypes[type];
    }
  }

  // Check the type of the message and increment the appropriate metric
  if ($json.message?.type === 'error') {
    currentMetrics.totalErrors++;
  } else if ($json.message?.type === 'command') {
    currentMetrics.totalCommands++;
  } else if ($json.message) {
    currentMetrics.totalMessages++;
  }

  // Write the updated metrics back to the file
  try {
    fs.writeFileSync(metricsFilePath, JSON.stringify(currentMetrics, null, 2));
  } catch (err) {
    console.error('Error writing metrics file:', err);
  }

  if ($json.message) {
    // Return the current metrics for the node output
    return [{
      json: {
        message: $json.message,
        metrics: currentMetrics
      }
    }];
  } else {
    return [{ json: {} }];
  }
}

module.exports = {
    call
};