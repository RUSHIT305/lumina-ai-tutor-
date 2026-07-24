import { SubjectId, Difficulty, FocusArea, QuizQuestion } from '../types';

export interface ChatRequestParams {
  prompt: string;
  subject: SubjectId;
  difficulty: Difficulty;
  focusArea: FocusArea;
  history: { role: 'user' | 'assistant'; content: string }[];
}

export async function fetchTutorChat(params: ChatRequestParams): Promise<string> {
  const response = await fetch('/api/tutor/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to communicate with Lumina AI Tutor');
  }

  const data = await response.json();
  return data.text;
}

export async function fetchVisualAid(concept: string, subject: SubjectId): Promise<string> {
  const response = await fetch('/api/tutor/visual-aid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concept, subject }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate visual diagram');
  }

  const data = await response.json();
  return data.imageUrl;
}

export async function fetchTextToSpeech(text: string, voice?: string): Promise<string> {
  const response = await fetch('/api/tutor/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to synthesize speech');
  }

  const data = await response.json();
  return data.audio;
}

export async function fetchQuizQuestion(subject: SubjectId, difficulty: Difficulty, topic?: string): Promise<QuizQuestion> {
  const response = await fetch('/api/tutor/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, difficulty, topic }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate quiz');
  }

  const data = await response.json();
  return data;
}
