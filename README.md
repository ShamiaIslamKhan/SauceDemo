# SauceDemo Test Automation

Automated end-to-end tests for the practice e-commerce website
[SauceDemo](https://www.saucedemo.com), built with **JavaScript** and **Playwright**.

## What is tested

| Module   | Test cases | What is covered |
|----------|-----------|-----------------|
| Login    | TC-01 to TC-09 | Valid login, wrong username/password, empty fields, locked-out user, case sensitivity, Enter key, access without login |
| Products | TC-10 to TC-14 | Product count, sorting (A-Z, price low-high, price high-low), logout |
| Cart     | TC-15 to TC-19 | Add item, add multiple items, button change, remove item, cart page contents |
| Checkout | TC-20 to TC-23 | Successful order, required-field validation (first name, last name, postal code) |

**Total:** 23 test cases, run on 3 browsers (Chromium, Firefox, WebKit) = 69 test executions.

## Testing techniques used
- Positive and negative testing
- Input validation testing
- Cross-browser testing
- Sorting and data verification

## Tech stack
- JavaScript
- Node.js
- Playwright Test
- GitHub Actions (automatic test runs)

## Project structure

    saucedemo-automation/
    ├── tests/
    │   ├── login.spec.js
    │   ├── products.spec.js
    │   ├── cart.spec.js
    │   └── checkout.spec.js
    ├── playwright.config.js
    └── package.json

## How to run

1. Install [Node.js](https://nodejs.org)
2. Clone this repository and open the `saucedemo-automation` folder
3. Run:

        npm install
        npx playwright install
        npx playwright test
        npx playwright show-report

## Test report

![Playwright report](screenshots/report.png)

## Issues found and fixed during testing
- **TC-19 failed on WebKit** with a strict mode violation (the locator matched
  6 elements instead of 1). Fixed by scoping the locator to `.cart_item`.
- **Checkout tests timed out** after a faulty setup edit. Fixed by correcting the
  `beforeEach` hook and adding an explicit wait for the form to be visible.

## Author
**[CHANGE: Shamia Islam Khan]**
GitHub: [ShamiaIslamKhan](https://github.com/ShamiaIslamKhan)
LinkedIn: [CHANGE: your LinkedIn link]
