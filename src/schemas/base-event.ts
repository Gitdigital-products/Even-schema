import { z } from 'zod';

export const BaseEventSchema = z.object({
  // Required fields
  id: z.string().uuid(),
  timestamp: z.string().datetime(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  eventType: z.string(),
  
  // Context
  source: z.string(),
  correlationId: z.string().uuid().optional(),
  
  // Git repository context
  repository: z.object({
    id: z.string(),
    name: z.string(),
    owner: z.string(),
    url: z.string().url().optional(),
    defaultBranch: z.string().optional(),
  }),
  
  // Actor who triggered the event
  actor: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    type: z.enum(['user', 'bot', 'system']).default('user'),
  }),
  
  // Event-specific payload
  body: z.record(z.any()),
  
  // Metadata
  metadata: z.object({
    processedAt: z.string().datetime().optional(),
    processedBy: z.string().optional(),
    retryCount: z.number().int().nonnegative().default(0),
  }).optional(),
});

export type BaseEvent = z.infer<typeof BaseEventSchema>;
