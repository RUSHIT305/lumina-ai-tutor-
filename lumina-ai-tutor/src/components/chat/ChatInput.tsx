import React, { useState } from 'react';
import { Send, Image, HelpCircle, Sparkles, Lightbulb } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  onGenerateVisual: () => void;
  onGenerateQuiz: () => void;
  isLoading: boolean;
  subjectName: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onGenerateVisual,
  onGenerateQuiz,
  isLoading,
  subjectName,
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  const quickPrompts = [
    `Explain simply with an analogy`,
    `Step-by-step breakdown`,
    `Real-world application of ${subjectName}`,
  ];

  return (
    <div className="bg-white border-t border-slate-200/80 p-4 sm:p-5 rounded-b-3xl space-y-3">
      {/* Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
        <span className="text-slate-400 font-bold shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick:</span>
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSend(prompt)}
            disabled={isLoading}
            className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-full font-semibold transition-all shrink-0 border border-slate-200/60 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Main input bar */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        <div className="flex items-center gap-1 pl-2">
          <button
            type="button"
            onClick={onGenerateVisual}
            disabled={isLoading}
            title="Generate Visual Diagram"
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors disabled:opacity-50"
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onGenerateQuiz}
            disabled={isLoading}
            title="Generate Practice Question"
            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors disabled:opacity-50"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={`Ask Lumina about ${subjectName}...`}
          disabled={isLoading}
          className="flex-1 px-2 py-2 bg-transparent text-slate-800 font-medium text-sm outline-none placeholder:text-slate-400 disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5 shrink-0"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-1">
        <span>Powered by Gemini 3.6 Flash & Server-side AI Engine</span>
        <span>Press Enter ↵ to send</span>
      </div>
    </div>
  );
};
