// Get all metrics from context
const metrics = {
  processingTime: $node['Metrics'].json[0].message,
  requestCount: $node['Metrics'].context.get('requestCount'),
  successCount: $node['Metrics'].context.get('successCount'),
  errorCount: $node['Metrics'].context.get('errorCount'),
  avgProcessingTime: $node['Metrics'].context.get('totalProcessingTime') / $node['Metrics'].context.get('requestCount')
};+
// log metrics

console.log("Sending data to monitoring system:", metrics);

return [{
  json: {
    message:"ok"
  }
}]