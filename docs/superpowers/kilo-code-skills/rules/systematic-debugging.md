# Systematic Debugging Rules

## When to Use
- When a bug is reported or discovered in any environment.
- When tests are failing and the cause is not immediately obvious.
- When system behavior deviates from specification.
- When an error occurs in production or staging.
- When performance degrades unexpectedly.

## Process

### Step 1: Reproduce and Understand (DO NOT FIX YET)
- Read the FULL error message and stack trace.
- Reproduce the issue reliably. Document exact reproduction steps.
- Check recent commits and changes to affected code.
- Identify which component, module, or layer is affected.
- Gather all relevant logs and diagnostic data.

### Step 2: Analyze Patterns
- Find similar working code or previous versions that worked.
- Compare working vs. broken state side by side.
- List all dependencies and their versions.
- Check configuration differences between working/broken environments.
- Read documentation for the APIs and libraries involved.

### Step 3: Hypothesize and Test
- Formulate ONE specific hypothesis about the root cause.
- Write it down explicitly: "I believe the bug is caused by X because Y."
- Design a minimal experiment to confirm or deny the hypothesis.
- Change ONE variable at a time. Never combine changes.
- If the hypothesis is wrong, return to Step 1 with new information.

### Step 4: Fix with Evidence
- Write a failing test that reproduces the bug.
- Apply a single, targeted fix addressing the root cause.
- Verify the fix with the new test.
- Run the full test suite for regressions.
- Document the root cause, the fix, and the reasoning.

## Checklist

- [ ] Error message and stack trace read completely
- [ ] Issue reliably reproduced with documented steps
- [ ] Recent changes reviewed for potential cause
- [ ] Root cause identified with evidence (not guessed)
- [ ] Hypothesis stated explicitly before fixing
- [ ] Only ONE change made at a time
- [ ] Failing test written BEFORE the fix
- [ ] Fix verified with test pass
- [ ] Full test suite passes (no regressions)
- [ ] Root cause and fix documented

## Red Flags (STOP and Restart Process)

- Proposing a fix before understanding the problem.
- Saying "let me just try..." without a clear hypothesis.
- Making multiple changes simultaneously.
- Third consecutive failed fix attempt (question the architecture).
- Assuming behavior without verifying with actual output.
- Feeling pressure to "just make it work" — this guarantees rework.

## Anti-Patterns

- **Shotgun debugging**: Changing random things hoping something works.
- **Print-and-pray**: Adding print statements without a theory of where the bug is.
- **The Quick Patch**: Fixing symptoms instead of root causes.
- **Blame the framework**: Assuming the bug is in a dependency without evidence.
- **Works on my machine**: Not reproducing in the environment where it fails.
