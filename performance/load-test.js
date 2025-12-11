const { setTimeout: delay } = require('node:timers/promises');

const targetBaseUrl = process.env.LOAD_TEST_URL || 'http://localhost:3000';
const durationSeconds = Number(process.env.LOAD_TEST_DURATION || 30);
const concurrency = Number(process.env.LOAD_TEST_CONCURRENCY || 10);
const endpoints = (process.env.LOAD_TEST_ENDPOINTS || '/,/games,/games/1')
    .split(',')
    .map((path) => path.trim())
    .filter(Boolean);

let stop = false;
let totalRequests = 0;
let totalErrors = 0;
let totalLatencyMs = 0;

const pickEndpoint = () => endpoints[Math.floor(Math.random() * endpoints.length)];

const runWorker = async (workerId) => {
    while (!stop) {
        const endpoint = pickEndpoint();
        const url = `${targetBaseUrl}${endpoint}`;
        const start = Date.now();
        try {
            const response = await fetch(url, { method: 'GET' });
            await response.text();
            totalRequests += 1;
            if (!response.ok) {
                totalErrors += 1;
            }
        } catch (error) {
            totalRequests += 1;
            totalErrors += 1;
            console.error(`[worker ${workerId}] request failed`, error);
        } finally {
            totalLatencyMs += Date.now() - start;
        }
    }
};

const run = async () => {
    console.log('Starting load test');
    console.log({ targetBaseUrl, durationSeconds, concurrency, endpoints });

    const workers = Array.from({ length: concurrency }, (_, index) => runWorker(index + 1));
    await delay(durationSeconds * 1000);
    stop = true;
    await Promise.all(workers);

    const averageLatency = totalRequests > 0 ? totalLatencyMs / totalRequests : 0;

    console.log('Load test finished');
    console.log({ totalRequests, totalErrors, averageLatencyMs: Number(averageLatency.toFixed(2)) });
};

run().catch((error) => {
    console.error('Load test failed', error);
    process.exit(1);
});