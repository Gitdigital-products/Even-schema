// Main exports
export * from './schemas';
export * from './utils/validation';

// Type exports
export type {
  BaseEvent,
  GitEvent,
  PushEvent,
  PullRequestEvent,
  IssueEvent,
  CIEvent,
  BuildEvent,
  TestEvent,
  DeployEvent,
  DigitalEvent,
} from './schemas';

// Convenience functions
import { createGitEvent, validateDigitalEvent } from './utils/validation';
export { createGitEvent, validateDigitalEvent };

// Version
export const VERSION = '1.0.0';
