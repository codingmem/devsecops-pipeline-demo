const http = require('http');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('Starting server tests...\n');

  // Test health endpoint
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  console.log('[PASS] Health check:', healthData.status === 'healthy' ? 'OK' : 'FAIL');

  // Test search endpoint
  const searchRes = await fetch(`${BASE_URL}/search?q=test`);
  const searchData = await searchRes.json();
  console.log('[PASS] Search endpoint:', searchData.results ? 'OK' : 'FAIL');

  console.log('\nAll tests passed.');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('[FAIL] Test error:', err.message);
  process.exit(1);
});