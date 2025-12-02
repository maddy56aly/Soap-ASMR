export type ContentType = 'Dust Core' | 'Clay Core' | 'Starch Core' | 'Cutting Soap';

export interface GeneratedResult {
  // Map content type to the final generated prompt
  prompts: Record<ContentType, string>;
  finalToneBlock: string;
}

export interface PromptTemplates {
  toneBlockTemplate: string;
  masterPrompts: Record<ContentType, string>;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  result: GeneratedResult;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING_TONE = 'ANALYZING_TONE',
  REVIEW_TONE = 'REVIEW_TONE',
  GENERATING_PROMPTS = 'GENERATING_PROMPTS',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}