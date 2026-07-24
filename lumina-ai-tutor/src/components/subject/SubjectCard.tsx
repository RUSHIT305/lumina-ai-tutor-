import React from 'react';
import { SubjectItem, SubjectId } from '../../types';
import { 
  Calculator, 
  Microscope, 
  Atom, 
  Code2, 
  Landmark, 
  Globe2, 
  Brain, 
  TrendingUp, 
  Check,
  ArrowRight
} from 'lucide-react';

interface SubjectCardProps {
  subject: SubjectItem;
  isSelected: boolean;
  onSelect: (id: SubjectId) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Microscope,
  Atom,
  Code2,
  Landmark,
  Globe2,
  Brain,
  TrendingUp,
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  isSelected,
  onSelect,
}) => {
  const Icon = ICON_MAP[subject.iconName] || Brain;

  return (
    <div
      onClick={() => onSelect(subject.id)}
      className={`relative group p-6 rounded-3xl transition-all duration-300 cursor-pointer border-2 bg-white ${
        isSelected
          ? 'border-indigo-600 shadow-xl shadow-indigo-100 ring-2 ring-indigo-200 scale-[1.02]'
          : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${subject.colorTheme.bg} ${subject.colorTheme.text} transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${subject.colorTheme.badge}`}>
          {subject.category}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 font-display mb-1.5 flex items-center gap-2">
        <span>{subject.name}</span>
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
        {subject.description}
      </p>

      {/* Topics preview */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {subject.sampleTopics.slice(0, 2).map((topic, i) => (
          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium">
            • {topic}
          </span>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
        <span>Start Session</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-sm">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      )}
    </div>
  );
};
