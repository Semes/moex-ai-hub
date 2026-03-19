# Superpowers -> Kilo Code: Adaptation Summary

## Source
Repository: [github.com/obra/superpowers](https://github.com/obra/superpowers)
License: MIT
Purpose: Agentic skills framework for coding agents (Claude Code, Cursor, Codex)

## What is Superpowers?

Superpowers is a development methodology framework that provides structured "skills" for AI coding agents. Instead of ad-hoc coding, it enforces systematic processes:

1. **Brainstorming** — Clarify requirements before writing code
2. **Writing Plans** — Create detailed implementation plans with TDD
3. **Executing Plans** — Follow plans step-by-step with checkpoints
4. **Test-Driven Development** — RED-GREEN-REFACTOR cycle, no exceptions
5. **Systematic Debugging** — Root cause investigation before fixes
6. **Code Review** — Structured review with severity classification
7. **Verification** — Evidence-based completion claims
8. **Subagent-Driven Development** — Delegate tasks to fresh agents
9. **Parallel Agent Dispatching** — Concurrent independent work
10. **Git Worktrees** — Isolated development branches
11. **Branch Finishing** — Clean merge workflow
12. **Writing Skills** — Meta-skill for creating new skills

## Key Methodology Principles

1. **No code without design** — Brainstorm and validate before implementing.
2. **No code without tests** — TDD is mandatory, not optional.
3. **No fixes without root cause** — Systematic debugging, not shotgun patches.
4. **No claims without evidence** — Verification gates prevent false completions.
5. **Severity-based prioritization** — Critical > Important > Minor.
6. **Small steps** — Each task 2-5 minutes. Each commit is atomic.
7. **YAGNI + DRY** — Do not over-build. Do not repeat.

## Adaptation for Kilo Code

### What Was Adapted (7 Skills)

| # | Skill | Custom Mode | Rules File |
|---|-------|-------------|------------|
| 1 | Code Review | `code-review.yaml` | `code-review.md` |
| 2 | Systematic Debugging | `systematic-debugging.yaml` | `systematic-debugging.md` |
| 3 | TDD | `tdd.yaml` | `tdd.md` |
| 4 | Brainstorming | `brainstorming.yaml` | `brainstorming.md` |
| 5 | Writing Plans | `writing-plans.yaml` | `writing-plans.md` |
| 6 | Security Audit | `security-audit.yaml` | `security-audit.md` |
| 7 | Verification | `verification.yaml` | `verification.md` |

### What Was NOT Adapted (and Why)

| Skill | Reason |
|-------|--------|
| Subagent-Driven Development | Kilo Code does not support native sub-agents in VS Code |
| Dispatching Parallel Agents | Kilo Code does not support parallel agent dispatch |
| Using Git Worktrees | Kilo Code does not support git worktrees natively |
| Finishing a Development Branch | Tightly coupled to git worktree workflow |
| Executing Plans | Merged concepts into Writing Plans mode |
| Writing Skills | Meta-skill for SKILL.md format, not applicable to Kilo Code |
| Using Superpowers | Introduction skill, not needed for Kilo Code adaptation |

### What Was Added

| Skill | Source |
|-------|--------|
| Security Audit | New skill synthesized from code review security aspects + OWASP + MOEX financial system requirements |

## How to Use

### Option A: Combined .kilocodemodes File
Copy `.kilocodemodes` to your project root. All 7 modes will be available in Kilo Code.

### Option B: Individual Custom Modes
Copy individual `.yaml` files from `custom-modes/` directory.

### Option C: Rules Files
Copy `.md` files from `rules/` to `.kilocode/rules/` in your project.
Rules are always active regardless of which mode is selected.

### Recommended Workflow

```
Brainstorming Mode   ->  Clarify requirements, approve design
         |
Writing Plans Mode   ->  Create detailed implementation plan
         |
TDD Mode             ->  Implement with RED-GREEN-REFACTOR
         |
Code Review Mode     ->  Review completed code
         |
Security Audit Mode  ->  Audit security aspects
         |
Verification Mode    ->  Verify everything before completion
```

## File Structure

```
docs/superpowers/kilo-code-skills/
  .kilocodemodes              # Combined file with all 7 modes
  custom-modes/
    brainstorming.yaml
    code-review.yaml
    security-audit.yaml
    systematic-debugging.yaml
    tdd.yaml
    verification.yaml
    writing-plans.yaml
  rules/
    brainstorming.md
    code-review.md
    security-audit.md
    systematic-debugging.md
    tdd.md
    verification.md
    writing-plans.md
```
