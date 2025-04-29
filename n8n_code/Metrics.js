// Get start time from context
/**
 * Collect all metrics and check alert cases.
 */
const startTime = $node['Metrics'].context.get('startTime') || Date.now();
const endTime = Date.now(); 
const processingTime = endTime - startTime;
$node['Metrics'].context.set('startTime',Date.now());

let requestCount = $node['Metrics'].context.get('requestCount') || 0;
let successCount = $node['Metrics'].context.get('successCount') || 0;
let errorCount = $node['Metrics'].context.get('errorCount') || 0;
let totalProcessingTime = $node['Metrics'].context.get('totalProcessingTime') || 0;

let consecutiveErrors = $node['Metrics'].context.get('consecutiveErrors') || 0;
const maxConsecutiveErrors = 3; // Trigger alert after 3 consecutive errors

requestCount++;
if($json.error){
  errorCount++;
  consecutiveErrors++;
} else {
  successCount++;
  consecutiveErrors = 0;
}
totalProcessingTime += processingTime;
const avgProcessingTime = totalProcessingTime / requestCount;

$node['Metrics'].context.set('requestCount', requestCount);
$node['Metrics'].context.set('successCount', successCount);
$node['Metrics'].context.set('errorCount', errorCount);
$node['Metrics'].context.set('totalProcessingTime', totalProcessingTime);
$node['Metrics'].context.set('consecutiveErrors', consecutiveErrors);

console.log("Processing time:", processingTime, "ms");
console.log("Request count:", requestCount);
console.log("Success count:", successCount);
console.log("Error count:", errorCount);
console.log("Avg processing time:", avgProcessingTime, "ms");
console.log("Consecutive errors:", consecutiveErrors);

// Check for 5xx error simulation (simplified for demonstration)
const errorRateThreshold = 0.5; // 50% error rate
if (errorCount > 0 && errorCount / requestCount > errorRateThreshold) {
    // Simulate a 5xx error alert
    $node['Metrics'].context.set('alertType', '5xx_error');

}
// Check for service unavailability simulation (simplified for demonstration)
const serviceUnavailabilityThreshold = 10000; // 10 seconds
if (processingTime > serviceUnavailabilityThreshold) {
    // Simulate a service unavailability alert
    $node['Metrics'].context.set('alertType', 'service_unavailable');

}

// Check for consecutive errors
if (consecutiveErrors >= maxConsecutiveErrors) {
  // Simulate consecutive error alert (RAG/LLM failure)
    $node['Metrics'].context.set('alertType', 'consecutive_errors');
}

return [{
    json: { 
      message: $json.message 
    }
}];

return [{
    json: {
      message: $json.message
    }
}];