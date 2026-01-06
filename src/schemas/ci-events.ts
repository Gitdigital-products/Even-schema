import { z } from 'zod';
import { BaseEventSchema } from './base-event';

// CI Event Types
export enum CIEventType {
  BUILD_START = 'ci.build.start',
  BUILD_COMPLETE = 'ci.build.complete',
  DEPLOY_START = 'ci.deploy.start',
  DEPLOY_COMPLETE = 'ci.deploy.complete',
  TEST_START = 'ci.test.start',
  TEST_COMPLETE = 'ci.test.complete',
  PIPELINE_START = 'ci.pipeline.start',
  PIPELINE_COMPLETE = 'ci.pipeline.complete',
}

// Build status
export const BuildStatusSchema = z.enum([
  'success',
  'failure',
  'cancelled',
  'skipped',
  'running',
  'pending',
]);

// Build event body
export const BuildEventBodySchema = z.object({
  buildId: z.string(),
  buildNumber: z.number(),
  status: BuildStatusSchema,
  duration: z.number().optional(), // in seconds
  artifactUrls: z.array(z.string().url()).optional(),
  logsUrl: z.string().url().optional(),
  triggeredBy: z.string(),
  environment: z.string().optional(),
});

// Test event body
export const TestEventBodySchema = z.object({
  testRunId: z.string(),
  totalTests: z.number(),
  passed: z.number(),
  failed: z.number(),
  skipped: z.number(),
  duration: z.number(), // in seconds
  coverage: z.object({
    lines: z.number().min(0).max(100).optional(),
    branches: z.number().min(0).max(100).optional(),
    functions: z.number().min(0).max(100).optional(),
  }).optional(),
});

// Deploy event body
export const DeployEventBodySchema = z.object({
  deploymentId: z.string(),
  environment: z.string(),
  version: z.string(),
  status: BuildStatusSchema,
  deployedBy: z.string(),
  deployedAt: z.string().datetime(),
  rollbackUrl: z.string().url().optional(),
});

// CI Event Schema
export const CIEventSchema = BaseEventSchema.extend({
  eventType: z.nativeEnum(CIEventType),
  body: z.union([
    BuildEventBodySchema,
    TestEventBodySchema,
    DeployEventBodySchema,
    z.record(z.any()), // Fallback for other CI events
  ]),
});

export type CIEvent = z.infer<typeof CIEventSchema>;
export type BuildEvent = CIEvent & { eventType: CIEventType.BUILD_COMPLETE | CIEventType.BUILD_START; body: z.infer<typeof BuildEventBodySchema> };
export type TestEvent = CIEvent & { eventType: CIEventType.TEST_COMPLETE | CIEventType.TEST_START; body: z.infer<typeof TestEventBodySchema> };
export type DeployEvent = CIEvent & { eventType: CIEventType.DEPLOY_COMPLETE | CIEventType.DEPLOY_START; body: z.infer<typeof DeployEventBodySchema> };
