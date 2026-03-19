# Brainstorming Rules

## When to Use
- Before starting any new feature or significant change.
- When requirements are ambiguous or incomplete.
- When multiple approaches are possible and the best one is unclear.
- When the change affects multiple subsystems or modules.
- When a stakeholder asks "can we build X?" and the answer needs analysis.

## Process

### Step 1: Understand Before Proposing
- Review existing code, docs, and architecture related to the request.
- Identify what already exists that can be reused or extended.
- Map out which systems, modules, and teams are affected.

### Step 2: Clarify Requirements (One Question at a Time)
- What problem does this solve? Who benefits?
- What are the must-have requirements vs. nice-to-have?
- What are the constraints (performance, security, compatibility, timeline)?
- How will success be measured?
- Are there existing patterns in the codebase this should follow?

### Step 3: Propose 2-3 Approaches
For each approach, document:
- **Description**: What is the approach?
- **Benefits**: Why is this good?
- **Risks**: What could go wrong?
- **Complexity**: How hard is this to implement?
- **Timeline estimate**: Rough effort estimate.
- **Recommendation**: Which approach and why.

### Step 4: Design the Chosen Approach
Break the design into sections:
1. Architecture overview (components and their responsibilities).
2. Data model (entities, relationships, storage).
3. API/interface design (contracts between components).
4. Error handling strategy.
5. Testing strategy.
6. Deployment and migration considerations.

### Step 5: Validate and Document
- Present each section to the stakeholder for approval.
- Document the approved design as a specification.
- Identify open questions and resolve them before implementation.

## Checklist

- [ ] Existing codebase and architecture reviewed
- [ ] All clarifying questions asked and answered
- [ ] At least 2 approaches considered with trade-offs
- [ ] Recommended approach selected with reasoning
- [ ] Architecture and components defined
- [ ] Data model documented
- [ ] API contracts specified
- [ ] Error handling strategy defined
- [ ] Testing strategy outlined
- [ ] Design approved by stakeholder before implementation
- [ ] Large scope decomposed into sub-projects

## Anti-Patterns

- **"Just start coding"**: Leads to rework, missed requirements, and architectural dead ends.
- **"This is too simple for design"**: Even small changes benefit from 5 minutes of design thinking.
- **"We will figure it out later"**: Deferred decisions compound and create technical debt.
- **"The user said 'just do it'"**: Present a minimal design anyway. It takes 5 minutes and saves hours.
- **Analysis paralysis**: If you have been brainstorming for more than 30 minutes without converging, pick the simplest approach and iterate.
