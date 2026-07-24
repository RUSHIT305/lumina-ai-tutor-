import React, { useState } from 'react';
import { UserProfile, SubjectId, Difficulty, FocusArea } from '../../types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  selectedSubject: SubjectId | null;
  difficulty: Difficulty;
  focusArea: FocusArea;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onLogout: () => void;
  onSelectSubject: (subject: SubjectId | null) => void;
  onResetSession?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  selectedSubject,
  difficulty,
  focusArea,
  activeNav,
  setActiveNav,
  onLogout,
  onSelectSubject,
  onResetSession,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 antialiased font-sans overflow-x-hidden">
      <Sidebar
        user={user}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onLogout={onLogout}
        onSelectSubject={onSelectSubject}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          user={user}
          selectedSubject={selectedSubject}
          difficulty={difficulty}
          focusArea={focusArea}
          onOpenSidebar={() => setSidebarOpen(true)}
          onBackToSubjects={() => onSelectSubject(null)}
          onResetSession={onResetSession}
        />

        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
