import React, { useState, useRef, useEffect } from 'react';
import { SubjectId, Difficulty, FocusArea, ChatMessage, QuizQuestion } from '../../types';
import { fetchTutorChat, fetchVisualAid, fetchQuizQuestion } from '../../services/api';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import { LoadingDots } from '../common/Badge';
import { Sparkles, Bot, Share2, RefreshCw } from 'lucide-react';

interface ChatInterfaceProps {
  subject: SubjectId;
  difficulty: Difficulty;
  focusArea: FocusArea;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAwardXP: (amount: number) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  subject,
  difficulty,
  focusArea,
  messages,
  setMessages,
  onAwardXP,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Thinking');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (userPrompt: string) => {
    if (!userPrompt.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: userPrompt,
      type: 'text',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setLoadingText('Consulting Lumina AI');

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const responseText = await fetchTutorChat({
        prompt: userPrompt,
        subject,
        difficulty,
        focusArea,
        history,
      });

      const assistantMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: responseText || "I couldn't generate a complete answer. Let's try rephrasing your question.",
        type: 'text',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      onAwardXP(20);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: `⚠️ System Note: ${error?.message || 'Could not connect to tutor service. Please check your network.'}`,
          type: 'text',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVisual = async (conceptPrompt?: string) => {
    setIsLoading(true);
    setLoadingText('Rendering Visual Diagram');

    const concept = conceptPrompt || `Key concept in ${subject}`;

    try {
      const imageUrl = await fetchVisualAid(concept, subject);
      const imgMessage: ChatMessage = {
        id: 'msg-img-' + Date.now(),
        role: 'assistant',
        content: imageUrl,
        type: 'image',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, imgMessage]);
      onAwardXP(30);
    } catch (error: any) {
      console.error("Visual aid error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: `⚠️ Failed to generate visual diagram: ${error?.message || 'Unknown error'}`,
          type: 'text',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuiz = async (topicPrompt?: string) => {
    setIsLoading(true);
    setLoadingText('Formulating Practice Question');

    try {
      const quiz = await fetchQuizQuestion(subject, difficulty, topicPrompt);
      const quizMessage: ChatMessage = {
        id: 'msg-quiz-' + Date.now(),
        role: 'assistant',
        content: quiz.question,
        type: 'quiz',
        quizData: quiz,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, quizMessage]);
      onAwardXP(25);
    } catch (error: any) {
      console.error("Quiz error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: `⚠️ Failed to create quiz: ${error?.message || 'Unknown error'}`,
          type: 'text',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBookmark = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isBookmarked: !msg.isBookmarked } : msg
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden h-[calc(100vh-140px)]">
      {/* Active Session Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 font-bold">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 font-display">Lumina {subject} Master</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500">
              Level: <span className="font-semibold text-slate-700">{difficulty}</span> • Focus: <span className="font-semibold text-indigo-600">{focusArea}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSend("Give me a comprehensive overview of this subject's core principles.")}
            disabled={isLoading}
            className="hidden sm:inline-flex px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            Overview
          </button>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-4 shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
              Welcome to {subject} Learning
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              I'm Lumina, your AI tutor tailored to your <strong className="text-slate-700">{difficulty}</strong> level.
              Ask a question, request a step-by-step diagram, or test your knowledge with a quiz!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full text-left">
              <button
                onClick={() => handleSend(`What are the fundamental concepts I should know in ${subject}?`)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
              >
                💡 Explain Core Concepts
              </button>
              <button
                onClick={() => handleGenerateQuiz()}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 hover:border-amber-300 hover:bg-amber-50/50 transition-all"
              >
                ❓ Take a Quick Quiz
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            onGenerateVisual={handleGenerateVisual}
            onGenerateQuiz={handleGenerateQuiz}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <LoadingDots text={loadingText} />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        onGenerateVisual={() => handleGenerateVisual()}
        onGenerateQuiz={() => handleGenerateQuiz()}
        isLoading={isLoading}
        subjectName={subject}
      />
    </div>
  );
};
