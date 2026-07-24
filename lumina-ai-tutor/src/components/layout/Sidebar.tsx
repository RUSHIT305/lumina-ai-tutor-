import React from 'react';
import { UserProfile, SubjectId } from '../../types';
import { 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Bookmark, 
  LogOut, 
  Sparkles,
  Award,
  Zap,
  Flame
} from 'lucide-react';

interface SidebarProps {
  user: UserProfile;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onLogout: () => void;
  onSelectSubject: (subject: SubjectId | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeNav,
  setActiveNav,
  onLogout,
  onSelectSubject,
  isOpen,
  onClose,
}) => {
  const navItems = [
    { id: 'subjects', label: 'All Subjects', icon: BookOpen },
    { id: 'bookmarks', label: 'Saved Notes & Visuals', icon: Bookmark, count: user.bookmarkedConcepts.length },
    { id: 'achievements', label: 'Learning Progress', icon: Trophy },
    { id: 'tutor-settings', label: 'Preferences', icon: GraduationCap },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (id === 'subjects') {
      onSelectSubject(null);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile screen */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside className={`fixed lg:static top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200/80 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Logo Brand Header */}
          <div 
            onClick={() => handleNavClick('subjects')}
            className="flex items-center gap-3.5 mb-8 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200/80 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display">Lumina</span>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md uppercase tracking-wider">AI Tutor</span>
              </div>
              <p className="text-xs text-slate-500">Personalized Mastery Engine</p>
            </div>
          </div>

          {/* User Stats Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500">Lvl {user.level} Scholar</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{user.streakDays}d</span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                <span>XP Progress</span>
                <span className="text-indigo-600">{user.xp % 1000} / 1000 XP</span>
              </div>
              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((user.xp % 1000) / 1000) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Quick Challenge Info & Logout */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl text-white text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Daily AI Challenge</span>
            </div>
            <p className="text-indigo-100 text-[11px]">Ask Lumina 3 questions today to gain 250 bonus XP!</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
