# Verification Before Completion Rules

## When to Use
- Before claiming ANY task is complete.
- Before reporting success to a stakeholder.
- Before merging code to main/develop.
- Before deploying to any environment.
- After every fix, change, or refactoring.
- When transitioning between tasks in a plan.

## Process

### Step 1: Identify What Needs Verification
For the claim you are about to make, list the specific checks:
- "Tests pass" requires running the test suite.
- "Build succeeds" requires running the build command.
- "Bug is fixed" requires reproducing the bug scenario and showing new behavior.
- "Feature works" requires demonstrating the feature.
- "No regressions" requires running the FULL test suite.

### Step 2: Run Verification Commands
- Execute each check freshly (do not rely on cached results).
- Use the exact commands the CI/CD pipeline uses.
- Do not truncate output.
- Capture exit codes.

### Step 3: Read and Analyze Output
- Read the ENTIRE output, not just the last line.
- Check for warnings, deprecation notices, and skipped tests.
- Verify the numbers: "42 tests passed, 0 failed, 0 skipped."
- An exit code of 0 is necessary but not sufficient — check the content.

### Step 4: Report with Evidence
- State the claim.
- Show the command that was run.
- Show the relevant output.
- State whether it PASSES or FAILS.

## Checklist

- [ ] Specific verification commands identified for the claim
- [ ] Commands run freshly after the latest changes
- [ ] Full output read (not just last line or exit code)
- [ ] Warnings and skipped items noted
- [ ] Exit code checked
- [ ] Evidence included in the completion report
- [ ] Each independent claim verified independently (lint, test, build = 3 checks)

## Red Flags (STOP and Verify)

Language patterns that indicate unverified claims:
- "Seems to work"
- "Should be fine"
- "Probably fixed"
- "I think that does it"
- "Looks correct"
- "Great!" or "Done!" before running any commands
- "No errors" (did you actually run it?)

## Verification Chain

Each layer must be verified independently:

```
Code compiles     (build command)
     |
Linter passes     (lint command)
     |
Unit tests pass   (test command)
     |
Integration tests pass  (integration test command)
     |
Application starts      (startup + health check)
     |
Feature works           (manual or automated verification)
```

Passing one layer does NOT guarantee the next. Verify each.

## Anti-Patterns

- **Optimistic completion**: "It should work because the logic looks right."
- **Partial verification**: Running only unit tests but claiming "all tests pass."
- **Stale evidence**: Showing test output from before the latest change.
- **Truncated output**: Hiding warnings or skipped tests by showing only the summary.
- **Exit-code-only**: "Exit code 0" does not mean everything is fine if the output shows warnings.
