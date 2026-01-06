export * from './base-event';
export * from './git-events';
export * from './ci-events';

// Combined event type
import { GitEventSchema, GitEventType } from './git-events';
import { CIEventSchema, CIEventType } from './ci-events';
import { z } from 'zod';

export const DigitalEventSchema = z.union([
  GitEventSchema,
  CIEventSchema,
  // Add other event schemas here as needed
]);

export type DigitalEvent = z.infer<typeof DigitalEventSchema>;

export const EventType = {
  ...GitEventType,
  ...CIEventType,
} as const;
