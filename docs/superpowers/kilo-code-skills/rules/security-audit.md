# Security Audit Rules

## When to Use
- Before any deployment to staging or production.
- When adding new API endpoints or external integrations.
- When handling authentication, authorization, or session changes.
- When processing financial data or PII.
- When adding new dependencies or upgrading existing ones.
- Periodically as part of security review sprints.

## Process

### Step 1: Map the Attack Surface
- List all entry points (API endpoints, form inputs, file uploads, WebSocket).
- Identify authentication and authorization boundaries.
- Map sensitive data flows (PII, credentials, financial data, tokens).
- Document trust boundaries between components.
- List all third-party integrations and dependencies.

### Step 2: Check Input Validation
For every input point, verify:
- SQL injection protection (parameterized queries, ORM usage).
- XSS prevention (output encoding, Content-Security-Policy headers).
- Command injection prevention (no shell commands with user input).
- Path traversal prevention (input sanitization for file paths).
- SSRF prevention (URL validation for server-side requests).
- File upload safety (type validation, size limits, secure storage).

### Step 3: Audit Authentication and Authorization
- Password hashing uses bcrypt/argon2 with proper salt.
- Sessions have secure flags, expiration, and rotation.
- JWT tokens validated properly (signature, expiration, issuer).
- Authorization checks exist on EVERY endpoint (not just frontend).
- API keys are scoped, rotatable, and stored securely.
- Admin operations require elevated authentication.

### Step 4: Review Data Protection
- Sensitive data encrypted at rest (database, backups).
- TLS enforced for all communications.
- Credentials NOT in source code or config files (use env vars or vault).
- Sensitive data NOT present in logs.
- Audit trail exists for all data modifications.
- Data retention policies defined and enforced.

### Step 5: Check Infrastructure Configuration
- CORS policy is restrictive (no wildcard origins in production).
- Security headers present (HSTS, X-Content-Type-Options, X-Frame-Options).
- Rate limiting on authentication and sensitive endpoints.
- Error messages do not expose system internals to clients.
- Dependencies checked for known CVEs.
- Containers run as non-root with minimal privileges.

### Step 6: Analyze Business Logic
- Race conditions in financial transactions (proper locking/atomicity).
- Financial calculations use Decimal, not floating point.
- Workflow steps cannot be skipped or replayed.
- Rate abuse prevention for business-critical operations.

## Checklist

- [ ] Attack surface mapped (all entry points documented)
- [ ] SQL injection: all queries parameterized
- [ ] XSS: all output encoded, CSP headers set
- [ ] Authentication: strong password hashing, secure sessions
- [ ] Authorization: checks on every endpoint, not just frontend
- [ ] Secrets: not in code, config files, or logs
- [ ] TLS: enforced for all connections
- [ ] CORS: no wildcard origins in production
- [ ] Security headers: HSTS, X-Content-Type-Options, X-Frame-Options
- [ ] Rate limiting: on auth endpoints and sensitive operations
- [ ] Error handling: no stack traces or internals exposed to clients
- [ ] Dependencies: no known CVEs, up to date
- [ ] Audit logging: all data modifications logged
- [ ] Financial calculations: Decimal types, not float
- [ ] Data encryption: sensitive data encrypted at rest
- [ ] File uploads: validated, size-limited, stored securely

## Severity Levels

| Level | Definition | Response Time |
|-------|-----------|---------------|
| P0 Critical | Active exploitability, data breach risk | 24 hours |
| P1 High | Exploitable with effort, missing auth/crypto | 1 week |
| P2 Medium | Conditional exploitation, missing headers | 1 month |
| P3 Low | Theoretical risk, defense-in-depth improvement | Next cycle |

## MOEX-Specific Requirements
- All financial calculations MUST use Decimal types.
- All API endpoints MUST have explicit authorization checks.
- Audit logging is MANDATORY for all data modifications.
- Rate limiting is MANDATORY on all public endpoints.
- All secrets MUST be in environment variables or vault.
- Database queries MUST use parameterized statements.
