# Code Review Rules

## When to Use
- Before merging any feature branch to main/develop.
- After completing a significant feature or bug fix.
- When refactoring existing code.
- When a teammate asks for a second pair of eyes.
- Before deploying to staging or production.

## Process

### Step 1: Understand the Context
- Read the PR/MR description or task specification.
- Understand WHAT changed and WHY.
- Identify the scope: which files, modules, and systems are affected.

### Step 2: Structural Analysis
- Does the change fit the existing architecture?
- Are responsibility boundaries respected (single responsibility per file/class)?
- Are new dependencies justified and documented?
- Are interfaces clean and backward-compatible?

### Step 3: Line-by-Line Review
- Read every changed file completely. No skipping.
- Check correctness: does the code do what it claims?
- Check edge cases: nulls, empty arrays, boundary values, error conditions.
- Check security: input validation, SQL injection, XSS, auth checks, data sanitization.
- Check performance: N+1 queries, unnecessary loops, memory leaks, blocking I/O.
- Check concurrency: race conditions, shared state, deadlocks.

### Step 4: Test Review
- Do tests exist for the new behavior?
- Do tests actually verify the behavior, not just exercise the code?
- Are edge cases tested?
- Do tests use meaningful assertions (not just "no error thrown")?

### Step 5: Report
Structure findings by severity:
- **Critical**: Must fix. Bugs, security holes, data loss risks.
- **Important**: Should fix. Quality issues, missing error handling.
- **Minor**: Can defer. Style, naming, minor optimizations.

## Checklist

- [ ] Read ALL changed files completely
- [ ] Verified the code matches the stated intent
- [ ] Checked for security vulnerabilities (injection, XSS, auth bypass)
- [ ] Checked for proper error handling and logging
- [ ] Checked for resource cleanup (connections, file handles)
- [ ] Verified test coverage for new behavior
- [ ] Checked for hardcoded values that should be config
- [ ] Verified no unnecessary dependencies added
- [ ] Checked naming consistency with project conventions
- [ ] Assessed impact on existing functionality (regression risk)

## Anti-Patterns to Flag
- "God classes" doing too many things.
- Catch-all error handlers that swallow exceptions.
- Copy-paste duplication instead of abstraction.
- Magic numbers without explanation.
- Commented-out code left in place.
- TODO comments without tracking tickets.
- Missing input validation on public APIs.
- Synchronous calls where async is appropriate.
