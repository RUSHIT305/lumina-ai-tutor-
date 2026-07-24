import React from 'react';
import { Image, ExternalLink, Download } from 'lucide-react';

interface VisualAidCardProps {
  imageUrl: string;
  concept?: string;
}

export const VisualAidCard: React.FC<VisualAidCardProps> = ({ imageUrl, concept }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm my-2 max-w-lg">
      <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5">
          <Image className="w-4 h-4 text-indigo-600" />
          <span>Educational Visual Aid</span>
        </div>
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px]"
        >
          <span>Open Full</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div className="relative bg-slate-100 group">
        <img
          src={imageUrl}
          alt={concept || "Educational Diagram"}
          className="w-full h-auto object-contain max-h-96"
        />
      </div>
      {concept && (
        <div className="p-3 text-xs text-slate-600 bg-white border-t border-slate-100 italic">
          "{concept}"
        </div>
      )}
    </div>
  );
};
