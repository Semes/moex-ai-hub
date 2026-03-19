# Writing Plans Rules

## When to Use
- After a design/spec has been approved (brainstorming phase complete).
- Before starting implementation of any multi-step feature.
- When multiple files or modules need coordinated changes.
- When onboarding someone to implement a feature you designed.
- When a task is too complex to hold in working memory.

## Process

### Step 1: Review the Specification
- Read the approved design document completely.
- Identify all components, data models, APIs, and interactions.
- List any open questions. Resolve them before planning.

### Step 2: Create the File Map
- List every file that will be created, modified, or deleted.
- Assign a single responsibility to each file.
- Pair each implementation file with its test file.
- Verify file paths match the project conventions.

### Step 3: Define Tasks (2-5 Minutes Each)
Each task follows the TDD cycle:
1. Write a failing test.
2. Verify the test fails correctly.
3. Implement the minimal code.
4. Verify all tests pass.
5. Commit.

For each task, include:
- Goal (one sentence).
- Exact file paths.
- Exact test code to write.
- Exact implementation code to write.
- Exact verification command and expected output.
- Commit message.

### Step 4: Order Tasks by Dependencies
- Independent tasks can be done in any order.
- Dependent tasks must specify which tasks they depend on.
- Foundation tasks (models, config) come first.
- Integration tasks (wiring, API endpoints) come last.
- Tests for each layer come before the next layer.

### Step 5: Review the Plan
- Can each task be completed in 2-5 minutes?
- Does every task have a test-first step?
- Are file paths exact and correct?
- Are code examples complete (not pseudocode)?
- Are verification commands specific (not "run tests")?
- If the plan has 15+ tasks, should it be split?

## Checklist

- [ ] Specification reviewed and understood completely
- [ ] All open questions resolved before planning
- [ ] File map created with all files and their purposes
- [ ] Each task takes 2-5 minutes
- [ ] Each task starts with a failing test
- [ ] Exact file paths provided (not relative descriptions)
- [ ] Exact code examples provided (not pseudocode)
- [ ] Exact verification commands with expected output
- [ ] Tasks ordered by dependencies
- [ ] Plan is completable in one focused session
- [ ] Plans with 15+ tasks are decomposed
- [ ] DRY: shared code identified and extracted early
- [ ] YAGNI: no features beyond the specification

## Plan Quality Anti-Patterns

- **Vague tasks**: "Implement the service logic" — Too vague. Write the actual code.
- **Mega-tasks**: Any task taking 15+ minutes. Break it down.
- **Missing tests**: A task without a test-first step. Add the test.
- **Abstract code**: Pseudocode instead of real code. Write real, executable code.
- **Missing paths**: "Update the config file" — Which config file? Full path required.
- **No verification**: "It should work" — Specify the exact command and expected output.
