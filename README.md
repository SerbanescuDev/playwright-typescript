# SauceDemo UI Automation with Playwright

[![Playwright Tests](https://github.com/SerbanescuDev/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/SerbanescuDev/playwright-typescript/actions/workflows/playwright.yml)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

End-to-end UI test suite for [SauceDemo](https://www.saucedemo.com/), a demo e-commerce web app.
The tests cover the main user flows of the shop: login, browsing products, managing the cart and placing an order.

The project is built with **Playwright** and **TypeScript** and follows the **Page Object Model** pattern, so the tests stay short and readable and the locators live in one place.


## Project structure

```
playwright-typescript/
├── .github/workflows/
│   └── playwright.yml      # CI pipeline
├── pages/                  # Page Object classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                  # Test specs, grouped by feature
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── utils/
│   └── testData.ts         # Users and checkout data
├── docs/
│   └── test-cases.md       # Manual test cases
├── playwright.config.ts    # Base URL, browser, reporter, screenshots, traces
└── package.json
```

## Test coverage

| # | Feature | Test case | Type |
|---|---------|-----------|------|
| 1 | Login | User can login with valid credentials | Positive |
| 2 | Login | Locked out user cannot login | Negative |
| 3 | Login | Error is shown for wrong password | Negative |
| 4 | Login | User can logout | Positive |
| 5 | Inventory | Inventory page shows 6 products | Positive |
| 6 | Inventory | Products can be sorted by price (low to high) | Positive |
| 7 | Cart | Added products appear in the cart | Positive |
| 8 | Cart | Product can be removed from the cart | Positive |
| 9 | Checkout | User can complete an order | End-to-end |
| 10 | Checkout | Error is shown when first name is missing | Negative |

The manual test cases (steps, test data and expected results) for these scenarios, plus 5 more that are not automated yet, are in [docs/test-cases.md](docs/test-cases.md).

## How the Page Object Model is used

Each page has its own class that holds the locators and the actions a user can do on that page.
The tests only call these methods and check the result, they don't deal with selectors directly.

```ts
// tests/checkout.spec.ts
test('user can complete an order', async ({ page }) => {
  await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
  await checkoutPage.finish();

  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
```

If a selector changes on the website, it only needs to be updated in one page class, not in every test.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer (latest LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/SerbanescuDev/playwright-typescript.git
cd playwright-typescript
npm install
npx playwright install chromium
```

### Running the tests

```bash
# Run all tests in headless mode
npm test

# Run tests with the browser visible
npm run test:headed

# Run a single test file
npx playwright test tests/login.spec.ts

# Check TypeScript types
npm run typecheck

# Open the HTML report after a run
npm run report
```

## Test results

All 10 tests run in parallel and finish in under 10 seconds.

```
Running 10 tests using 9 workers

  ✓  Login › user can login with valid credentials
  ✓  Login › locked out user cannot login
  ✓  Login › error is shown for wrong password
  ✓  Login › user can logout
  ✓  Inventory › inventory page shows 6 products
  ✓  Inventory › products can be sorted by price from low to high
  ✓  Cart › added products appear in the cart
  ✓  Cart › product can be removed from the cart
  ✓  Checkout › user can complete an order
  ✓  Checkout › error is shown when first name is missing

  10 passed (7.6s)
```

When a test fails, Playwright saves a screenshot and a trace, which can be opened from the HTML report to see exactly what happened step by step.

## Continuous integration

The tests run on GitHub Actions on every push and pull request to `main`. The workflow can also be started manually from the **Actions** tab.

The pipeline has three stages:

```
Type Check  ──►  Login Tests      ──►  Test Report
                 Inventory Tests
                 Cart Tests
                 Checkout Tests
```

1. **Type Check** - runs `tsc` to make sure there are no TypeScript errors
2. **Tests** - each test file runs in its own job, all four in parallel
3. **Test Report** - the results from all jobs are combined into one HTML report, which can be downloaded from the run page (kept for 14 days)

The workflow file is in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

## Roadmap

Planned improvements are tracked as [GitHub issues](https://github.com/SerbanescuDev/playwright-typescript/issues) and on the [project board](https://github.com/users/SerbanescuDev/projects/1).

- [ ] [#1](https://github.com/SerbanescuDev/playwright-typescript/issues/1) Use Playwright fixtures to create the page objects
- [ ] [#2](https://github.com/SerbanescuDev/playwright-typescript/issues/2) Add a login fixture for tests that need a logged in user
- [ ] [#3](https://github.com/SerbanescuDev/playwright-typescript/issues/3) Reuse the login session with `storageState`
- [ ] [#4](https://github.com/SerbanescuDev/playwright-typescript/issues/4) Run the tests on Firefox and WebKit
- [ ] [#5](https://github.com/SerbanescuDev/playwright-typescript/issues/5) Add tests for the other SauceDemo users
