/**
 * Log all KPI's
 */
const kpis = {
    processingTime: $node['Metrics'].json[0].message,
    requestCount: $node['Metrics'].context.get('requestCount'),
    successCount: $node['Metrics'].context.get('successCount'),
    errorCount: $node['Metrics'].context.get('errorCount'),
    avgProcessingTime: $node['Metrics'].context.get('totalProcessingTime') / $node['Metrics'].context.get('requestCount'),
    //Add more kpis if needed
  };
console.log("KPIs:", kpis);

return [{
  json: {
    message:"ok"
  }
}]