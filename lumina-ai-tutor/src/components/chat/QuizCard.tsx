import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { HelpCircle, CheckCircle, XCircle, Sparkles, RefreshCw } from 'lucide-react';

interface QuizCardProps {
  quiz: QuizQuestion;
  onComplete?: (passed: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onComplete }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIndex(idx);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);
    if (onComplete) {
      onComplete(selectedIndex === quiz.correctIndex);
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-slate-50 p-5 shadow-xs my-3 max-w-xl text-slate-800">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100/80">
        <div className="flex items-center gap-2 font-bold text-xs text-indigo-700 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Interactive Practice Check</span>
        </div>
        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-md">
          1 Question
        </span>
      </div>

      <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-4 leading-snug">
        {quiz.question}
      </h4>

      <div className="space-y-2 mb-4">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === quiz.correctIndex;
          
          let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30";
          
          if (submitted) {
            if (isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
            } else if (isSelected && !isCorrect) {
              btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
            } else {
              btnStyle = "bg-white border-slate-200 opacity-60";
            }
          } else if (isSelected) {
            btnStyle = "bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-200 font-semibold";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center border border-slate-200">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {submitted && isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {submitted && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIndex === null}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
        >
          Check Answer
        </button>
      ) : (
        <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs leading-relaxed space-y-1 animate-fadeIn">
          <div className="font-bold flex items-center gap-1.5 text-slate-900">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Explanation</span>
          </div>
          <p className="text-slate-600">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
};
