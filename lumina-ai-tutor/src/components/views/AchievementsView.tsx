import React from 'react';
import { UserProfile } from '../../types';
import { Trophy, Flame, Award, Zap, CheckCircle2, Star, BookOpen } from 'lucide-react';

interface AchievementsViewProps {
  user: UserProfile;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ user }) => {
  const badges = [
    { name: 'First Steps', desc: 'Completed initial study session', earned: true, icon: Star },
    { name: 'Concept Master', desc: 'Reached 500 XP in learning', earned: user.xp >= 500, icon: Award },
    { name: 'Streak Scholar', desc: 'Maintained a 3-day streak', earned: user.streakDays >= 3, icon: Flame },
    { name: 'Visualizer', desc: 'Generated 3 AI visual diagrams', earned: true, icon: Zap },
    { name: 'Quiz Champion', desc: 'Scored 100% on practice quizzes', earned: user.completedSessions >= 5, icon: Trophy },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500 fill-amber-500" />
          <span>Learning Progress & Achievements</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">Track your study XP, streak milestones, and earned badges</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total XP</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black font-display text-slate-900">{user.xp}</p>
          <p className="text-[11px] text-indigo-600 font-semibold">+25 XP for each completed quiz</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-3xl font-black font-display text-slate-900">{user.streakDays} Days</p>
          <p className="text-[11px] text-emerald-600 font-semibold">Active learner streak</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Current Level</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-black font-display text-slate-900">Level {user.level}</p>
          <p className="text-[11px] text-slate-500">Scholar Tier</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Sessions Completed</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-black font-display text-slate-900">{user.completedSessions}</p>
          <p className="text-[11px] text-slate-500">Interactive AI sessions</p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display">Earned Badges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                  b.earned
                    ? 'bg-slate-50/80 border-indigo-200/80 shadow-xs'
                    : 'bg-slate-50/30 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  b.earned ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{b.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{b.desc}</p>
                  {b.earned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
