import React, { useState } from 'react';
import { Difficulty, FocusArea } from '../../types';
import { Sliders, Volume2, ShieldCheck, Trash2, CheckCircle2 } from 'lucide-react';

interface PreferencesViewProps {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  focusArea: FocusArea;
  setFocusArea: (f: FocusArea) => void;
  onClearHistory: () => void;
}

export const PreferencesView: React.FC<PreferencesViewProps> = ({
  difficulty,
  setDifficulty,
  focusArea,
  setFocusArea,
  onClearHistory,
}) => {
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const voices = [
    { id: 'Kore', label: 'Kore (Warm & Encouraging)' },
    { id: 'Zephyr', label: 'Zephyr (Professional & Calm)' },
    { id: 'Puck', label: 'Puck (Energetic & Dynamic)' },
    { id: 'Charon', label: 'Charon (Deep & Clear)' },
  ];

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Sliders className="w-6 h-6 text-indigo-600" />
          <span>Tutor Preferences & Voice Settings</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">Customize Lumina's voice persona, default study level, and storage</p>
      </div>

      {/* Voice Selection */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 font-display">
          <Volume2 className="w-4 h-4 text-indigo-600" />
          <span>AI Voice Persona (Text-To-Speech)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {voices.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVoice(v.id)}
              className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                selectedVoice === v.id
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{v.label}</span>
              {selectedVoice === v.id && (
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Default Level */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-display">Default Knowledge Level</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(Difficulty).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                difficulty === d
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Save & Danger Zone */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onClearHistory}
          className="px-4 py-2.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Chat History</span>
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved!</span>
            </>
          ) : (
            <span>Save Preferences</span>
          )}
        </button>
      </div>
    </div>
  );
};
