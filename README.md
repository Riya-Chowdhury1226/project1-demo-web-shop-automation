# Demo Web Shop Automation & API Testing

## Project Overview
UI automation (Playwright + POM) for https://demowebshop.tricentis.com/ and API automation (Postman + Newman) for https://jsonplaceholder.typicode.com/users.
- Q1: Invalid login
- Q2: Register + add product to cart
- Q3: Search -> checkout -> order details (E2E)
- API: GET all users, save ID, PUT /users/{id} with dynamic data

## Tech Stack
Node.js 18+, Playwright Test (Page Object Model), allure-playwright, Allure commandline (Java 8+ required), Postman collection, Newman (htmlextra + allure reporters), Git/GitHub.

## Setup
1. Install Node.js 18+ and Java 8+
2. git clone <your-repo-url>
3. cd demo-web-shop-automation
4. npm install
5. npx playwright install chromium

## How to Run
- Q1 only: npm run test:q1
- Q2 only: npm run test:q2
- Q3 only: npm run test:q3
- All UI tests sequentially: npm run test:ui
- API tests only: npm run test:api
- Everything together: npm run test:all

## Reports
Reports are generated automatically after every run.
- Allure: npm run report:open
- Playwright HTML: npm run report:html
- API HTML: api-tests/reports/api-report.html
Screenshots are attached to every UI test.

## API Tests
Collection: api-tests/DemoWebShop_API.postman_collection.json
Run directly: npx newman run api-tests/DemoWebShop_API.postman_collection.json

## Branches
feature/q1-invalid-login, feature/q2-register-add-to-cart, feature/q3-e2e-checkout, feature/api-tests (all merged into main)