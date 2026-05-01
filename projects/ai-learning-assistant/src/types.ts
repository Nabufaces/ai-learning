export interface KnowledgeDocument {
  source: string;
  content: string;
}

export interface SearchResult {
  source: string;
  score: number;
  excerpt: string;
}

export interface AssistantAnswer {
  answer: string;
  sources: string[];
}

