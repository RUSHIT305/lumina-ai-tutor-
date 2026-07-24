import React, { useState } from 'react';
import { UserProfile, SubjectId, Difficulty, FocusArea, ChatMessage } from './types';
import { Layout } from './components/layout/Layout';
import { AuthModal } from './components/auth/AuthModal';
import { SubjectGrid } from './components/subject/SubjectGrid';
import { SessionSettings } from './components/subject/SessionSettings';
import { ChatInterface } from './components/chat/ChatInterface';
import { BookmarksView } from './components/views/BookmarksView';
import { AchievementsView } from './components/views/AchievementsView';
import { PreferencesView } from './components/views/PreferencesView';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'user-demo',
    name: 'Jane Smith',
    email: 'jane.smith@lumina.edu',
    level: 2,
    xp: 520,
    streakDays: 5,
    completedSessions: 6,
    bookmarkedConcepts: [],
  });

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Intermediate);
  const [focusArea, setFocusArea] = useState<FocusArea>(FocusArea.DeepDive);
  const [activeNav, setActiveNav] = useState<string>('subjects');

  // Messages state preserved per subject session
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  if (!user) {
    return <AuthModal onLogin={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
    setSelectedSubject(null);
  };

  const handleSelectSubject = (id: SubjectId | null) => {
    setSelectedSubject(id);
    if (id) {
      setActiveNav('subjects');
    }
  };

  const handleAwardXP = (amount: number) => {
    setUser((prev) => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setChatMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isBookmarked: false } : msg))
    );
  };

  const handleClearBookmarks = () => {
    setChatMessages((prev) => prev.map((msg) => ({ ...msg, isBookmarked: false })));
  };

  const handleResetSession = () => {
    setChatMessages([]);
  };

  return (
    <Layout
      user={user}
      selectedSubject={selectedSubject}
      difficulty={difficulty}
      focusArea={focusArea}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      onLogout={handleLogout}
      onSelectSubject={handleSelectSubject}
      onResetSession={handleResetSession}
    >
      {activeNav === 'bookmarks' && (
        <BookmarksView
          messages={chatMessages}
          onRemoveBookmark={handleRemoveBookmark}
          onClearAll={handleClearBookmarks}
        />
      )}

      {activeNav === 'achievements' && (
        <AchievementsView user={user} />
      )}

      {activeNav === 'tutor-settings' && (
        <PreferencesView
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          focusArea={focusArea}
          setFocusArea={setFocusArea}
          onClearHistory={handleResetSession}
        />
      )}

      {activeNav === 'subjects' && (
        !selectedSubject ? (
          <div className="space-y-10">
            {/* Hero Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-2xl relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-indigo-200 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Welcome Back, {user.name.split(' ')[0]}!</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                  What would you like to <span className="text-indigo-300 underline underline-offset-8 decoration-indigo-400/50">master today?</span>
                </h1>

                <p className="text-indigo-100/80 text-sm leading-relaxed">
                  Select a subject below to launch a interactive tutoring session with voice narration, step-by-step diagrams, and practice quizzes.
                </p>
              </div>
            </div>

            {/* Subject Selector Grid */}
            <SubjectGrid
              selectedSubject={selectedSubject}
              onSelectSubject={handleSelectSubject}
            />

            {/* Session Configuration Settings */}
            <SessionSettings
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              focusArea={focusArea}
              setFocusArea={setFocusArea}
            />
          </div>
        ) : (
          <ChatInterface
            subject={selectedSubject}
            difficulty={difficulty}
            focusArea={focusArea}
            messages={chatMessages}
            setMessages={setChatMessages}
            onAwardXP={handleAwardXP}
          />
        )
      )}
    </Layout>
  );
};

export default App;
