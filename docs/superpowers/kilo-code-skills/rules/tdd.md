# Test-Driven Development (TDD) Rules

## When to Use
- When implementing any new feature or behavior.
- When fixing a bug (test reproduces the bug first).
- When refactoring code (tests protect against regressions).
- When changing any public API or interface.
- When adding new endpoints, services, or data models.

## Process

### The Red-Green-Refactor Cycle

#### RED: Write a Failing Test
1. Write ONE test for the next small piece of behavior.
2. Run the test. It MUST fail.
3. The failure must be because the feature is not implemented yet.
4. If the test passes immediately, it is not testing new behavior — rewrite it.

#### GREEN: Make It Pass
1. Write the SIMPLEST possible code to make the test pass.
2. Do not add anything beyond what the test requires.
3. Do not refactor yet. Do not write more tests yet.
4. If existing tests break, fix the implementation, not the tests.

#### REFACTOR: Clean Up
1. Only when all tests are green.
2. Remove duplication. Improve names. Simplify logic.
3. Run tests after every change to ensure they still pass.
4. Do not add new behavior during refactoring.

### Bug Fix with TDD
1. Write a test that reproduces the bug exactly.
2. Verify the test fails (confirming the bug exists in tests).
3. Fix the code.
4. Verify the test passes.
5. Run full suite to check for regressions.
6. Commit with message explaining the bug and fix.

## Checklist

- [ ] Test written BEFORE the production code
- [ ] Test was observed to fail with the correct failure reason
- [ ] Implementation is the minimal code to make the test pass
- [ ] All tests pass after the implementation
- [ ] Refactoring done only with all tests green
- [ ] Edge cases tested (null, empty, boundary, error conditions)
- [ ] Tests are independent (no order dependency)
- [ ] Tests use descriptive names that explain the expected behavior
- [ ] Minimal use of mocks (prefer real code paths)
- [ ] Commit made after each successful GREEN phase

## Red Flags (STOP and Restart Cycle)

- Writing production code before a failing test exists.
- A test passing immediately on first run (tests existing behavior, not new).
- Modifying a test to make it pass instead of fixing the implementation.
- Writing multiple tests before implementing anything.
- A RED-GREEN cycle taking longer than 15 minutes (step is too big).
- Rationalizing "this is too simple to test."

## Test Quality Standards

**Good Test**: Tests one specific behavior, has a descriptive name, uses real code paths, runs fast, is independent of other tests.

**Bad Test**: Tests multiple behaviors, has a vague name ("test1"), relies on mocks for everything, is slow, depends on test execution order.

## Naming Convention for Tests
```
test_[unit]_[scenario]_[expected_result]
```
Examples:
- test_user_login_with_valid_credentials_returns_token
- test_order_creation_with_empty_cart_raises_error
- test_price_calculation_with_discount_applies_correctly
