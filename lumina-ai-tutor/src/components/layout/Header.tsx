import React from 'react';
import { UserProfile, SubjectId, Difficulty, FocusArea } from '../../types';
import { Menu, Sparkles, Trophy, Flame, RotateCcw } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  selectedSubject: SubjectId | null;
  difficulty: Difficulty;
  focusArea: FocusArea;
  onOpenSidebar: () => void;
  onBackToSubjects: () => void;
  onResetSession?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  selectedSubject,
  difficulty,
  focusArea,
  onOpenSidebar,
  onBackToSubjects,
  onResetSession,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {selectedSubject ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onBackToSubjects}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
            >
              ← Subjects
            </button>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-display truncate">
                {selectedSubject}
              </h1>
              <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {difficulty} • {focusArea}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Lumina AI Learning Studio
            </h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {selectedSubject && onResetSession && (
          <button
            onClick={onResetSession}
            title="Clear & Restart Session"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        )}

        <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
          <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{user.xp} XP</span>
        </div>
      </div>
    </header>
  );
};
