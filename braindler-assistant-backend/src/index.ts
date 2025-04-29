import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import prismaPlugin from './plugins/prisma';
import { logger, errorLogger } from './logger'; // Import the logger and errorLogger
import scriptsRoutes from './routes/scripts';
import { monitoring } from './monitoring';

// Thresholds for error rate and service unavailability
const errorRateThreshold = 0.1; // 10% error rate
const serviceUnavailabilityThreshold = 60000; // 60 seconds

let errorCount5xx = 0; // Counter for 5xx errors
let lastAvailabilityCheck = Date.now();
let isServiceAvailable = true;
let consecutiveRagLlmErrors = 0; // Counter for consecutive RAG/LLM errors

const server = Fastify({ logger: true });

server.register(swagger, {
  routePrefix: '/docs',
  swagger: {
    info: { title: 'Braindler Assistant API', version: '1.0.0' }
  },
  exposeRoute: true
});

// Function to send alerts (placeholder for now)
function sendAlert(message: string) {
  server.log.warn(`ALERT: ${message}`);
  // In a real implementation, you would send this to a monitoring system or DevOps team
}

const maxConsecutiveRagLlmErrors = 3; // Threshold for consecutive RAG/LLM errors
// Hook to check service availability and calculate error rate
server.addHook('onReady', (done) => {
  setInterval(() => {
    // Check if the service is available (this is a placeholder - replace with a real check)
    const now = Date.now();
    const isAvailableNow = true; // Replace with actual check

    if (!isAvailableNow) {
        errorLogger.error('Service is unavailable'); // Log the error using errorLogger
    }    

    isServiceAvailable = isAvailableNow;
    lastAvailabilityCheck = now;
    
    // Check for extended periods of unavailability
    if (!isServiceAvailable && now - lastAvailabilityCheck > serviceUnavailabilityThreshold) {
      sendAlert(`Service has been unavailable for more than ${serviceUnavailabilityThreshold}ms`);
    }

    // Calculate error rate
    if (errorCount5xx > 0) {
      const errorRate = errorCount5xx / 1; // Assuming we're checking every 1 second
      if (errorRate > errorRateThreshold) {
        sendAlert(`Error rate exceeded threshold: ${errorRate * 100}%`);
      }
    }
  }, 60000); // Check every 60 seconds
  done();
});

// Hook to log requests and responses, and send metrics
server.addHook('onRequest', async (request, reply) => {
  request.log.info({ method: request.method, url: request.url }, 'Request started');
  request.startTime = process.hrtime();
});




server.addHook('onResponse', async (request, reply) => {
  const { method, url, body, query, params } = request;
  const { statusCode } = reply;

  const diff = process.hrtime(request.startTime);
  const responseTime = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
  const responseSize = reply.getHeader('content-length') || 0;

  request.log.info({ method, url, statusCode, responseTime, responseSize, body, query, params }, 'Request completed');

  monitoring.sendMetrics({
    method,
    url,
    statusCode,
    responseTime,
    responseSize: +responseSize,
  });
  
  // Check for 5xx errors and increment the counter
  if (statusCode >= 500) {
    errorCount5xx++;
    // Log the 5xx error using errorLogger
    errorLogger.error({ method, url, statusCode, responseTime, responseSize, body, query, params }, `5xx error occurred. Current count: ${errorCount5xx}`);
  }
  // Simulate RAG/LLM error detection (replace with actual logic)
  // Check for RAG/LLM errors and increment the counter
  const isRagLlmError = Math.random() < 0.1; // 10% chance of error (for demonstration)
  if (isRagLlmError) {
    consecutiveRagLlmErrors++;
    errorLogger.error(`RAG/LLM error detected. Consecutive errors: ${consecutiveRagLlmErrors}`);
    // Send an alert if the threshold is exceeded
    if(consecutiveRagLlmErrors >= maxConsecutiveRagLlmErrors) {
        sendAlert(`Consecutive RAG/LLM errors exceeded threshold: ${consecutiveRagLlmErrors}`);
    }
  } else {
    // Reset the counter if no error is detected
    if(consecutiveRagLlmErrors > 0) {
        errorLogger.info(`RAG/LLM error fixed. Reseting error counter.`);
    }
    consecutiveRagLlmErrors = 0;
  }


});

server.register(logger);
server.register(prismaPlugin);
server.register(scriptsRoutes, { prefix: '/scripts' });

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server running at ${address}`);
});