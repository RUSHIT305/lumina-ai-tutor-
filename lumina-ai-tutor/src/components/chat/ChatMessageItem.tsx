import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../../types';
import { VisualAidCard } from './VisualAidCard';
import { QuizCard } from './QuizCard';
import { fetchTextToSpeech } from '../../services/api';
import { playBase64Audio, stopAudioPlayback } from '../../services/audio';
import { 
  Volume2, 
  VolumeX, 
  Image as ImageIcon, 
  HelpCircle, 
  Bookmark, 
  BookmarkCheck, 
  Bot, 
  User 
} from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onGenerateVisual: (concept: string) => void;
  onGenerateQuiz: (topic: string) => void;
  onToggleBookmark: (messageId: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onGenerateVisual,
  onGenerateQuiz,
  onToggleBookmark,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const isUser = message.role === 'user';

  const handleSpeak = async () => {
    if (isPlayingAudio) {
      stopAudioPlayback();
      setIsPlayingAudio(false);
      return;
    }

    try {
      setIsSynthesizing(true);
      const audioBase64 = await fetchTextToSpeech(message.content);
      setIsSynthesizing(false);
      setIsPlayingAudio(true);
      await playBase64Audio(audioBase64);
      setIsPlayingAudio(false);
    } catch (error) {
      console.error("Audio playback error:", error);
      setIsSynthesizing(false);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[88%] sm:max-w-[80%] group relative ${
        isUser
          ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-xs p-4 shadow-xs'
          : 'bg-white text-slate-800 rounded-2xl rounded-tl-xs p-5 border border-slate-200/80 shadow-xs'
      }`}>
        {/* Render content based on message type */}
        {message.type === 'text' && (
          <div className={isUser ? 'text-sm leading-relaxed whitespace-pre-wrap' : 'prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-2'}>
            {isUser ? (
              <p>{message.content}</p>
            ) : (
              <div className="markdown-body">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
          </div>
        )}

        {message.type === 'image' && (
          <VisualAidCard imageUrl={message.content} />
        )}

        {message.type === 'quiz' && message.quizData && (
          <QuizCard quiz={message.quizData} />
        )}

        {/* Action toolbar for assistant text messages */}
        {!isUser && message.type === 'text' && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <button
              onClick={handleSpeak}
              disabled={isSynthesizing}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isPlayingAudio
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {isSynthesizing ? (
                <span>Generating Voice...</span>
              ) : isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>

            <button
              onClick={() => onGenerateVisual(message.content.substring(0, 100))}
              className="px-2.5 py-1 bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Visualize Diagram</span>
            </button>

            <button
              onClick={() => onGenerateQuiz(message.content.substring(0, 100))}
              className="px-2.5 py-1 bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Practice Quiz</span>
            </button>

            <button
              onClick={() => onToggleBookmark(message.id)}
              className="ml-auto p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
              title={message.isBookmarked ? 'Remove Bookmark' : 'Save Concept'}
            >
              {message.isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
