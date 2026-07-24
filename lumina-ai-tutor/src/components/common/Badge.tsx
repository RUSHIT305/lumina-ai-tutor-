import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'amber' | 'neutral';
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  onClick,
  active = false,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none';

  const variants = {
    primary: active
      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100',
    secondary: active
      ? 'bg-slate-800 text-white shadow-sm ring-2 ring-slate-300'
      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
    success: active
      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100',
    amber: active
      ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100',
    neutral: active
      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
      : 'bg-white text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 border border-slate-200',
  };

  return (
    <span
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const LoadingDots: React.FC<{ text?: string }> = ({ text = 'Thinking' }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-2xl text-xs font-semibold text-slate-600">
      <span>{text}</span>
      <div className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};
