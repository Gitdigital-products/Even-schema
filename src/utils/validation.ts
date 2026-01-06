import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { DigitalEventSchema, GitEventSchema, CIEventSchema } from '../schemas';
import { BaseEvent } from '../schemas/base-event';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// JSON Schema validators
export const digitalEventValidator = ajv.compile(DigitalEventSchema);
export const gitEventValidator = ajv.compile(GitEventSchema);
export const ciEventValidator = ajv.compile(CIEventSchema);

// Runtime validation with Zod
export function validateDigitalEvent(event: unknown): event is BaseEvent {
  return DigitalEventSchema.safeParse(event).success;
}

export function validateGitEvent(event: unknown) {
  return GitEventSchema.safeParse(event);
}

export function validateCIEvent(event: unknown) {
  return CIEventSchema.safeParse(event);
}

// Event factory with validation
export function createGitEvent(data: Partial<BaseEvent> & { eventType: string; body: any }) {
  const event: BaseEvent = {
    id: data.id || generateEventId(),
    timestamp: data.timestamp || new Date().toISOString(),
    version: data.version || '1.0.0',
    eventType: data.eventType,
    source: data.source || 'unknown',
    repository: data.repository!,
    actor: data.actor!,
    body: data.body,
    metadata: data.metadata,
  };

  const validation = validateGitEvent(event);
  if (!validation.success) {
    throw new Error(`Invalid git event: ${JSON.stringify(validation.error.errors)}`);
  }

  return validation.data;
}

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
