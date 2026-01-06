import { createGitEvent, GitEventType, validateDigitalEvent } from '../src';
import { PushEventBodySchema } from '../src/schemas/git-events';

describe('Event Schema Validation', () => {
  test('should create a valid git push event', () => {
    const event = createGitEvent({
      eventType: GitEventType.PUSH,
      repository: {
        id: 'repo-123',
        name: 'test-repo',
        owner: 'test-org',
      },
      actor: {
        id: 'user-456',
        name: 'Test User',
      },
      body: {
        ref: 'refs/heads/main',
        before: 'abc123',
        after: 'def456',
        created: false,
        deleted: false,
        forced: false,
        commits: [],
      },
    });

    expect(event.eventType).toBe(GitEventType.PUSH);
    expect(validateDigitalEvent(event)).toBe(true);
  });

  test('should reject invalid git event', () => {
    const invalidEvent = {
      id: '123',
      // Missing required fields
    };

    expect(validateDigitalEvent(invalidEvent)).toBe(false);
  });

  test('should validate push event body schema', () => {
    const validPushBody = {
      ref: 'refs/heads/main',
      before: 'abc123',
      after: 'def456',
      created: false,
      deleted: false,
      forced: false,
      commits: [],
    };

    const invalidPushBody = {
      // Missing required fields
    };

    expect(PushEventBodySchema.safeParse(validPushBody).success).toBe(true);
    expect(PushEventBodySchema.safeParse(invalidPushBody).success).toBe(false);
  });
});
