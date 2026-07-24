import React from 'react';
import { ChatMessage } from '../../types';
import { Bookmark, Trash2, BookOpen, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

interface BookmarksViewProps {
  messages: ChatMessage[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  messages,
  onRemoveBookmark,
  onClearAll,
}) => {
  const bookmarked = messages.filter((m) => m.isBookmarked);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-indigo-600 fill-indigo-600" />
            <span>Saved Concepts & Notes</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review key explanations, formulas, and visual diagrams saved during your sessions
          </p>
        </div>

        {bookmarked.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved</span>
          </button>
        )}
      </div>

      {bookmarked.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No saved notes yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any explanation or visual diagram during your study sessions to save it here for quick revision!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarked.map((msg) => (
            <div key={msg.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 relative group">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-indigo-600">Saved Note</span>
                <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
              </div>

              {msg.type === 'text' && (
                <div className="prose prose-slate max-w-none text-xs leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">
                  <div className="markdown-body">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              )}

              {msg.type === 'image' && (
                <img
                  src={msg.content}
                  alt="Saved Diagram"
                  className="w-full h-40 object-cover rounded-xl border border-slate-100"
                />
              )}

              <button
                onClick={() => onRemoveBookmark(msg.id)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
