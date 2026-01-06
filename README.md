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
