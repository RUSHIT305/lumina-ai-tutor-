export enum SubjectId {
  Mathematics = 'Mathematics',
  Science = 'Science',
  History = 'History',
  Coding = 'Coding',
  Languages = 'Languages',
  Philosophy = 'Philosophy',
  Physics = 'Physics',
  Economics = 'Economics',
}

export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Master = 'Master'
}

export enum FocusArea {
  DeepDive = 'Deep Dive',
  QuickReview = 'Quick Review',
  ExamPrep = 'Exam Prep',
  HomeworkHelp = 'Homework Help',
  ConceptMap = 'Concept Mapping'
}

export interface SubjectItem {
  id: SubjectId;
  name: string;
  category: string;
  description: string;
  iconName: string;
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
  sampleTopics: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'image' | 'quiz';
  quizData?: QuizQuestion;
  timestamp: number;
  isBookmarked?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  streakDays: number;
  completedSessions: number;
  bookmarkedConcepts: string[];
}

export interface SessionConfig {
  subject: SubjectId;
  difficulty: Difficulty;
  focusArea: FocusArea;
  topic?: string;
}
