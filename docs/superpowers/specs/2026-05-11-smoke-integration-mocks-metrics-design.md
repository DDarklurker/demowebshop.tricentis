# Design: Smoke Tests, Integration Tests, Mocks, and Metrics

**Date:** 2026-05-11
**Project:** demowebshop.tricentis (Playwright E2E test suite)
**Status:** Approved — Ready for implementation

---

## 1. Overview

Add four new subsystems to the existing Playwright test suite:
- **Smoke tests** — critical path verification (tagged `@smoke`)
- **API/Integration tests** — direct HTTP calls to backend without browser
- **Flow tests** — end-to-end cross-page user journeys
- **Mocks** — network interception for edge cases and stability
- **Metrics** — Allure Report + custom collector + Prometheus export + SLI/SLO

All follow the existing Page Object Model + Component architecture conventions.

---

## 2. Directory Structure — Final

```
demowebshop.tricentis/
├── tests/
│   ├── smoke/                           # NEW — smoke tests
│   │   └── criticalPaths.spec.ts
│   ├── api/                             # NEW — API/integration tests
│   │   ├── fixture/
│   │   │   └── api.fixture.ts
│   │   ├── auth/
│   │   │   ├── login.api.spec.ts
│   │   │   ├── register.api.spec.ts
│   │   │   └── recover.api.spec.ts
│   │   ├── catalog/
│   │   │   └── products.api.spec.ts
│   │   ├── cart/
│   │   │   └── cart.api.spec.ts
│   │   └── search/
│   │       └── search.api.spec.ts
│   ├── flows/                           # NEW — cross-page E2E flows
│   │   ├── fixture/
│   │   │   └── flow.fixture.ts
│   │   ├── purchase.flow.spec.ts
│   │   ├── authentication.flow.spec.ts
│   │   ├── catalog.flow.spec.ts
│   │   └── wishlist.flow.spec.ts
│   ├── data/                            # EXISTING
│   │   └── users.json
│   └── tests/                           # EXISTING
│       ├── authorization/
│       │   ├── login.spec.ts
│       │   ├── register.spec.ts
│       │   └── recover.spec.ts
│       └── card/
│           └── card.spec.ts
├── src/
│   ├── mocks/                           # NEW — mock handlers
│   │   ├── handlers/
│   │   │   ├── auth.handler.ts
│   │   │   ├── catalog.handler.ts
│   │   │   ├── cart.handler.ts
│   │   │   └── common.handler.ts
│   │   ├── scenarios/
│   │   │   ├── network-delay.ts
│   │   │   ├── server-unavailable.ts
│   │   │   └── no-internet.ts
│   │   ├── mock.factory.ts
│   │   └── mock.types.ts
│   ├── metrics/                         # NEW — metrics collection
│   │   ├── collector.ts
│   │   ├── reporter.ts
│   │   ├── slo.config.ts
│   │   ├── slo.checker.ts
│   │   ├── history.ts
│   │   ├── prometheus.exporter.ts
│   │   └── types.ts
│   ├── components/                      # EXISTING
│   ├── fixture/                         # EXISTING
│   ├── pages/                           # EXISTING
│   └── utils/                           # EXISTING
├── metrics/                             # NEW — generated metrics output
│   ├── .gitkeep
│   └── (generated files: metrics.json, metrics.txt, slo-result.json, history.json)
├── playwright.config.ts                 # UPDATED — new projects + reporters
└── package.json                         # UPDATED — new dependencies
```

---

## 3. Smoke Tests

### 3.1 Purpose
Verify the most critical paths work on every push/PR. Fast, no auth required for most tests, lightweight fixture.

### 3.2 Test Cases
| # | Tag | Test | Assertions |
|---|-----|------|------------|
| 1 | `@smoke` | Home page loads | status 200, logo visible, top menu visible |
| 2 | `@smoke` | User can log in | email/password from .env, redirect to home, logout link visible |
| 3 | `@smoke` | User can register | faker-generated data, success message, redirect |
| 4 | `@smoke` | Catalog navigation | click Books/Computers/Electronics → products appear |
| 5 | `@smoke` | Search returns results | search "computer" → at least 1 result |
| 6 | `@smoke` | Shopping cart accessible | click cart → cart page loads |
| 7 | `@smoke` | Password recovery page loads | click forgot password → recover page visible |
| 8 | `@smoke` | API health check | GET / returns 200 |

### 3.3 Implementation Details
- File: `tests/smoke/criticalPaths.spec.ts`
- Fixture: `fixtureSmoke` — extends `fixtureBase`, no logged-in state
- CI: automatically picked up by existing `project:smoke` (grep `@smoke`)
- Timeout: 60s per test

---

## 4. API / Integration Tests

### 4.1 Purpose
Direct HTTP testing of backend endpoints. Fast, reliable, no browser overhead. Validates API contracts.

### 4.2 Fixture: `api.fixture.ts`
- Uses Playwright `request` fixture (APIRequestContext)
- Sets `baseURL`, `Content-Type: application/json`, `Accept: application/json`
- Handles cookie/session propagation for authenticated requests
- Exports: `apiRequest`, `authenticatedRequest`

### 4.3 Test Files

#### `auth/login.api.spec.ts`
| # | Test | Method | Endpoint | Assertions |
|---|------|--------|----------|------------|
| 1 | Login with valid credentials | POST | /login | 302, set-cookie present |
| 2 | Login with wrong password | POST | /login | 200, error message "Login was unsuccessful" |
| 3 | Login with non-existent email | POST | /login | 200, error message |
| 4 | Login with empty fields | POST | /login | 200, validation errors |

#### `auth/register.api.spec.ts`
| # | Test | Method | Endpoint | Assertions |
|---|------|--------|----------|------------|
| 1 | Register new user | POST | /register | 302, redirect to / |
| 2 | Register with existing email | POST | /register | 200, "email already exists" |
| 3 | Register with weak password | POST | /register | 200, password strength warning |
| 4 | Register with empty fields | POST | /register | 200, validation errors |

#### `auth/recover.api.spec.ts`
| # | Test | Method | Endpoint | Assertions |
|---|------|--------|----------|------------|
| 1 | Recover with registered email | POST | /passwordrecover | 200, success message |
| 2 | Recover with non-existent email | POST | /passwordrecover | 200, "email not found" |
| 3 | Recover with empty email | POST | /passwordrecover | 200, validation error |

#### `catalog/products.api.spec.ts`
| # | Test | Method | Endpoint | Assertions |
|---|------|--------|----------|------------|
| 1 | Get books category | GET | /books | 200, JSON with products array |
| 2 | Get computers category | GET | /computers | 200, sub-categories present |
| 3 | Get electronics category | GET | /electronics | 200, products array |
| 4 | Get non-existent category | GET | /nonexistent | 404 |
| 5 | Get product details | GET | /product/{id} | 200, name, price, SKU |

#### `cart/cart.api.spec.ts`
| # | Test | Method | Endpoint | Assertions |
|---|------|--------|----------|------------|
| 1 | View empty cart | GET | /cart | 200, "Your Shopping Cart is empty" |
| 2 | Add product to cart | POST | /cart/add/{id} | 200, item in cart |
| 3 | Update cart quantity | POST | /cart | 200, quantity updated |
| 4 | Remove item from cart | POST | /cart | 200, cart empty |

#### `search/search.api.spec.ts`
| # | Test | Method | Endpoint | Assertions |
|---|------|--------|----------|------------|
| 1 | Search with results | GET | /search?q=computer | 200, products found |
| 2 | Search with no results | GET | /search?q=xyznonexist | 200, "No products found" |
| 3 | Empty search query | GET | /search?q= | 200, search box warning |

### 4.4 Response Validation
- Status code matches expected
- Content-Type is text/html or application/json
- Body contains expected text/fields
- Response time < 5s (warning if > 3s)

---

## 5. Flow Tests (End-to-End)

### 5.1 Purpose
Complete user journeys spanning multiple pages. Tests real user behavior patterns.

### 5.2 Fixture: `flow.fixture.ts`
- Extends `fixturePage` with all page objects
- Uses `storageState` for authenticated flows
- Sets `fullyParallel: false`, `workers: 1` (flows are sequential)
- Tagged `@e2e`

### 5.3 Test Files

#### `purchase.flow.spec.ts` — 3 tests
| # | Test | Steps |
|---|------|-------|
| 1 | Guest purchase flow | Home → click product → view details → add to cart → view cart → proceed to checkout → fill shipping → verify order summary |
| 2 | Registered user purchase | Login → browse category → select product → add to cart → checkout → verify address pre-filled |
| 3 | Cart management | Add item → change quantity + → add second item → remove first → verify total recalculated |

#### `authentication.flow.spec.ts` — 2 tests
| # | Test | Steps |
|---|------|-------|
| 1 | Register → Logout → Login | Register (faker) → verify logged in → logout → login with new credentials → verify profile |
| 2 | Recover password flow | Login page → click forgot password → enter email → verify recovery message → login with old credentials should fail |

#### `catalog.flow.spec.ts` — 2 tests
| # | Test | Steps |
|---|------|-------|
| 1 | Browse and filter | Home → Computers → Desktops → verify products → return to catalog → Electronics → Cell phones |
| 2 | Search and explore | Search "book" → click result → verify details → back to results → click another product |

#### `wishlist.flow.spec.ts` — 2 tests
| # | Test | Steps |
|---|------|-------|
| 1 | Add/remove from wishlist | Login → browse → add to wishlist → open wishlist → verify item → remove → verify empty |
| 2 | Guest wishlist redirect | Home → click wishlist (not logged in) → verify redirect to login → login → verify redirected to wishlist |

### 5.4 playwright.config.ts Update
```typescript
{
  name: 'flows',
  use: { ...devices['Desktop Chrome'] },
  testMatch: /flows\/.*\.flow\.spec\.ts/,
  fullyParallel: false,
  workers: 1,
}
```

---

## 6. Mocks

### 6.1 Purpose
Simulate edge cases the real server cannot provide: server errors, timeouts, empty states, network conditions. Used primarily in UI tests where backend behavior needs to be controlled.

### 6.2 Mock Handlers

#### `auth.handler.ts`
| Function | Status | Body |
|----------|--------|------|
| `loginSuccess()` | 200 → 302 | Set-Cookie, redirect to / |
| `loginInvalid()` | 200 | "Login was unsuccessful. Please correct the errors and try again." |
| `loginServerError()` | 500 | "Internal Server Error" |
| `registerSuccess()` | 302 | Redirect to / |
| `registerDuplicate()` | 200 | "The specified email already exists" |

#### `catalog.handler.ts`
| Function | Status | Body |
|----------|--------|------|
| `catalogWithProducts()` | 200 | HTML with .product-item elements |
| `catalogEmpty()` | 200 | "No products found in this category" |
| `catalogTimeout()` | — | `route.abort('timedout')` |

#### `cart.handler.ts`
| Function | Status | Body |
|----------|--------|------|
| `cartWithItems()` | 200 | HTML with cart items |
| `cartEmpty()` | 200 | "Your Shopping Cart is empty!" |
| `cartAddError()` | 422 | "Product out of stock" |

#### `common.handler.ts`
| Function | Status | Body |
|----------|--------|------|
| `homePageOk()` | 200 | Normal homepage HTML |
| `homePageError()` | 503 | "Service Unavailable" |

### 6.3 Scenarios

| Scenario | Handler | Use Case |
|----------|---------|----------|
| `network-delay.ts` | 3s delay on all requests | Test loading states, spinners |
| `server-unavailable.ts` | All requests → 503 | Test error pages, retry logic |
| `no-internet.ts` | All requests → abort | Test offline behavior |

### 6.4 Mock Factory
```typescript
// mock.factory.ts
export function createMock(page: Page, handler: MockHandler) {
  return async () => {
    await page.route(handler.url, async (route) => {
      await route.fulfill({
        status: handler.status,
        body: handler.body,
        headers: handler.headers,
      });
    });
  };
}
```

### 6.5 Where Mocks Are Used
- **Smoke tests:** mock home page 503 to test error display (1 test only)
- **Flow tests:** mock server-error scenario (1 test per flow file)
- **API tests:** NO mocks — these test real backend
- **Existing tests:** unchanged

---

## 7. Metrics

### 7.1 Components

#### `collector.ts` — MetricCollector
Collects during test run:
- `testName`, `status` (passed/failed/skipped), `duration`, `retries`
- Test-level: startTime, endTime, error message (if failed)
- Suite-level: total, passed, failed, skipped, flaky count

#### `reporter.ts` — CustomPlaywrightReporter
Implements Playwright `Reporter` interface:
- `onTestEnd()` — records each test result
- `onEnd()` — prints summary table, calls SLI checker, exports metrics

Console output:
```
┌──────────────────────────────────────────────────────────┐
│  Test Run Metrics                              Duration  │
├──────────────────────────────────────────────────────────┤
│  ✅ Passed: 21     ❌ Failed: 0     ⚠️ Flaky: 0          │
│  🔄 Retries: 0     ⏱️ Total: 2m34s  📊 Success: 100%    │
│                                                          │
│  SLI Check                                                │
│  ✔ successRate: 100% >= 95%                              │
│  ✔ p95Latency: 3.2s <= 5s                                │
│  ✔ flakyRate: 0% <= 2%                                   │
│                                                          │
│  Allure: npx allure serve allure-results/                 │
└──────────────────────────────────────────────────────────┘
```

#### `slo.config.ts` — SLO Thresholds
```typescript
export const SLO = {
  successRate: { min: 95 },            // percentage
  p95Latency: { max: 5000 },           // milliseconds
  p99Latency: { max: 10000 },          // milliseconds
  flakyRate: { max: 2 },               // percentage
};
```

#### `slo.checker.ts` — SloChecker
- Reads collected metrics
- Checks against SLO thresholds
- Writes `metrics/slo-result.json`
- Exits with code 1 if SLO violated (optional, configurable)

#### `history.ts` — History
- Reads previous run metrics from `metrics/history.json`
- Appends current run
- Calculates trends: delta vs previous run
- Keeps last 30 runs

#### `prometheus.exporter.ts` — Prometheus Exporter
- Converts metrics to Prometheus text format
- Writes `metrics/metrics.txt`
- Also writes `metrics/metrics.json` (structured JSON)
- Metrics exported:
  - `test_total{status="pass|fail|skip"}` — gauge
  - `test_duration_seconds{name="..."}` — histogram
  - `test_success_rate` — gauge
  - `test_p95_latency_seconds` — gauge

### 7.2 Allure Report Integration
- Add `allure-playwright` to devDependencies
- Add to `playwright.config.ts` reporters: `['allure-playwright']`
- Generated in `allure-results/`
- View with: `npx allure serve allure-results/`
- New npm script: `npm run report:allure`

### 7.3 Update `playwright.config.ts`
```typescript
reporter: [
  ['list'],
  ['html'],
  ['allure-playwright'],
  ['./src/metrics/reporter.ts'],
],
```

### 7.4 Update `package.json`
```json
{
  "scripts": {
    "test": "playwright test && npx playwright merge-reports --reporter=html ./blob-report && npx playwright merge-reports --reporter=allure-playwright ./blob-report",
    "test:ci": "playwright test --project=smoke",
    "test:local": "playwright test --project=auth --project=user && npx playwright show-report",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "test:api": "playwright test --project=api",
    "test:flows": "playwright test --project=flows",
    "report:allure": "npx allure serve allure-results/"
  }
}
```

---

## 8. Explanations (Code Comments)

### 8.1 Comment Convention
Every new file includes:
1. **File-level JSDoc** — what this module does, when to use it
2. **Function-level JSDoc** — `@param`, `@returns`, `@example` for public API
3. **Inline comments** — only for non-obvious logic (edge cases, workarounds)

### 8.2 Example
```typescript
/**
 * Smoke tests for critical application paths.
 * These run on every push/PR via CI. Tagged @smoke.
 *
 * Strategy: verify ONLY the most essential user flows.
 * Each test must complete in < 60s. No complex assertions.
 */
test.describe('Critical Paths', () => {
  test('User can log in with valid credentials @smoke', async ({ ... }) => {
    // ...
  });
});
```

---

## 9. Implementation Order

1. **Mocks infrastructure** — `src/mocks/` (basis for other tests)
2. **Metrics infrastructure** — `src/metrics/` (reporter runs from day 1)
3. **Smoke tests** — `tests/smoke/` (immediate CI value)
4. **API tests** — `tests/api/` (fast, independent)
5. **Flow tests** — `tests/flows/` (depends on page objects from API phase)
6. **Integration** — update CI configs, final verification

---

## 10. Constraints

- **No breaking changes** to existing test files — all current tests must continue passing
- **No changes to `.env`** or `storage/state.json` — environment remains the same
- **External site** remains the same (demowebshop.tricentis.com)
- **CI time** — smoke tests in CI must remain under 5 minutes
- **Dependencies** — minimize new packages (only `allure-playwright` added)

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| External site changes break tests | Mocks provide stable alternative; API tests detect changes early |
| Flow tests slow CI | Separate project, not in smoke CI run |
| Allure adds complexity | Optional — metrics work without it via custom reporter |
| Mock maintenance burden | Only mock specific edge cases, not full site |
