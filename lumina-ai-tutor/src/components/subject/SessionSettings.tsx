import React from 'react';
import { Difficulty, FocusArea } from '../../types';
import { Sliders, Zap, Award, Target, BookOpenCheck } from 'lucide-react';

interface SessionSettingsProps {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  focusArea: FocusArea;
  setFocusArea: (f: FocusArea) => void;
}

export const SessionSettings: React.FC<SessionSettingsProps> = ({
  difficulty,
  setDifficulty,
  focusArea,
  setFocusArea,
}) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">Custom Tutor Configuration</h2>
          <p className="text-xs text-slate-500">Tune Lumina's pedagogical approach for this session</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Knowledge Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Target Knowledge Level</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100/80 p-1.5 rounded-2xl">
            {Object.values(Difficulty).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  difficulty === d
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Focus */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-600" />
            <span>Pedagogical Focus Area</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(FocusArea).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFocusArea(f)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  focusArea === f
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
