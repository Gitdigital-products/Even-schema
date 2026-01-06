import { createGitEvent, GitEventType, validateDigitalEvent } from '../src';

// Example 1: Creating a push event
const pushEvent = createGitEvent({
  eventType: GitEventType.PUSH,
  source: 'github',
  repository: {
    id: '123456789',
    name: 'my-repository',
    owner: 'my-organization',
    url: 'https://github.com/my-organization/my-repository',
    defaultBranch: 'main',
  },
  actor: {
    id: '987654321',
    name: 'John Doe',
    email: 'john.doe@example.com',
    type: 'user',
  },
  body: {
    ref: 'refs/heads/feature-branch',
    before: 'abc123',
    after: 'def456',
    created: false,
    deleted: false,
    forced: false,
    commits: [
      {
        id: 'def456',
        message: 'Add new feature',
        timestamp: new Date().toISOString(),
        author: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
    ],
  },
});

console.log('Created event:', pushEvent);

// Example 2: Validating an existing event
const someEvent = {
  id: 'evt_123',
  timestamp: new Date().toISOString(),
  version: '1.0.0',
  eventType: 'git.push',
  source: 'gitlab',
  repository: {
    id: '123',
    name: 'repo',
    owner: 'owner',
  },
  actor: {
    id: '456',
    name: 'Jane Doe',
  },
  body: {
    ref: 'refs/heads/main',
  },
};

const isValid = validateDigitalEvent(someEvent);
console.log('Is valid?', isValid);
