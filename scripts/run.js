const { spawnSync } = require('child_process');
const fs = require('fs');

const mode = (process.argv[2] || 'all').toLowerCase();
const specs = {
  q1: 'tests/q1-invalid-login.spec.js',
  q2: 'tests/q2-register-add-to-cart.spec.js',
  q3: 'tests/q3-search-checkout-e2e.spec.js',
};
const API_CMD =
  'npx newman run api-tests/DemoWebShop_API.postman_collection.json ' +
  '-r cli,htmlextra,allure ' +
  '--reporter-htmlextra-export api-tests/reports/api-report.html ' +
  '--reporter-allure-export allure-results';

if (!specs[mode] && !['ui', 'api', 'all'].includes(mode)) {
  console.error('Unknown mode. Use: q1 | q2 | q3 | ui | api | all');
  process.exit(1);
}

function run(cmd) {
  console.log(`\n> ${cmd}`);
  const r = spawnSync(cmd, { stdio: 'inherit', shell: true });
  return r.status === null ? 1 : r.status;
}

['allure-results', 'allure-report', 'playwright-report', 'test-results', 'api-tests/reports'].forEach((d) =>
  fs.rmSync(d, { recursive: true, force: true })
);
fs.mkdirSync('allure-results', { recursive: true });
fs.mkdirSync('api-tests/reports', { recursive: true });

let code = 0;
if (specs[mode]) {
  code = run(`npx playwright test ${specs[mode]}`);
} else {
  if (mode === 'ui' || mode === 'all') code = run('npx playwright test');
  if (mode === 'api' || mode === 'all') code = run(API_CMD) || code;
}

run('npx allure generate allure-results --clean -o allure-report');

console.log('\nReports generated:');
console.log(' - Allure report : allure-report/index.html  (open with: npm run report:open)');
if (mode !== 'api') console.log(' - Playwright HTML: playwright-report/index.html');
if (mode === 'api' || mode === 'all') console.log(' - Newman HTML    : api-tests/reports/api-report.html');
process.exit(code);