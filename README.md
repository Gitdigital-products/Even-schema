<!-- Security Badges -->
![Security Foundational](https://img.shields.io/badge/security-foundational-blue)
![Security Scanning](https://img.shields.io/badge/security-scanning-active-green)

<!-- Activity Badges -->
![Last Commit](https://img.shields.io/badge/commit-current-brightgreen)
![Issues Health](https://img.shields.io/badge/issues-healthy-brightgreen)
![Release Cadence](https://img.shields.io/badge/releases-active-brightgreen)

<!-- Maturity Badges -->
![CI Status](https://img.shields.io/badge/CI-passing-brightgreen)
![Versioning](https://img.shields.io/badge/versioning-semver-blue)

<!-- Technology Badges -->
![Primary Language](https://img.shields.io/badge/language-JavaScript-yellow)
![Containerized](https://img.shields.io/badge/containerized-Docker-blue)

<!-- Quality Badges -->
![Linting](https://img.shields.io/badge/linting-passing-brightgreen)
![Documentation](https://img.shields.io/badge/docs-complete-brightgreen)

<!-- Community Badges -->
![Contributors](https://img.shields.io/badge/contributors-2-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)
https://img.shields.io/badge/security-foundational-blue
https://opencollective.com/dashboard/gitdigital/updates/0n4gx0br-ov5m96nk-b3g6d8lk-3ey7jzwa


# GitDigital Event Schema

Canonical event schemas shared across repositories to prevent chaos later.

## Installation

```bash
npm install gitdigital-event-schema
# or
yarn add gitdigital-event-schema
```

Usage

```typescript
import { GitEvent, GitEventType, createGitEvent, validateGitEvent } from 'gitdigital-event-schema';

// Create a validated event
const pushEvent = createGitEvent({
  eventType: GitEventType.PUSH,
  repository: {
    id: 'repo-123',
    name: 'my-repo',
    owner: 'my-org',
    url: 'https://github.com/my-org/my-repo'
  },
  actor: {
    id: 'user-456',
    name: 'john-doe',
    email: 'john@example.com'
  },
  body: {
    ref: 'refs/heads/main',
    commits: [
      {
        id: 'abc123',
        message: 'Initial commit',
        timestamp: new Date().toISOString()
      }
    ]
  }
});

// Validate existing events
const isValid = validateGitEvent(someEvent);
```

Available Schemas

Git Events

· PUSH
· PULL_REQUEST
· PULL_REQUEST_REVIEW
· ISSUE
· BRANCH_CREATE
· BRANCH_DELETE
· TAG_CREATE

CI/CD Events

· BUILD_START
· BUILD_COMPLETE
· DEPLOY_START
· DEPLOY_COMPLETE
· TEST_START
· TEST_COMPLETE

Schema Validation

All events are validated against JSON Schema (AJV) and TypeScript types.

License

MIT
