import React, { useState } from 'react';

interface ToneBlockReviewProps {
  toneBlock: string;
  onUpdateToneBlock: (newBlock: string) => void;
  onRegenerate: (feedback: string) => void;
  onDone: () => void;
  isRegenerating: boolean;
}

export const ToneBlockReview: React.FC<ToneBlockReviewProps> = ({
  toneBlock,
  onUpdateToneBlock,
  onRegenerate,
  onDone,
  isRegenerating
}) => {
  const [feedback, setFeedback] = useState('');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="neu-flat p-6 border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-purple-400 font-bold text-lg tracking-wide uppercase">
            Step 1: Review Tone Block
          </h2>
          <span className="text-xs text-slate-500 font-medium bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
             Verify Visual Details
          </span>
        </div>

        <div className="space-y-4">
          {/* Editable Tone Block */}
          <div className="relative group">
            <textarea
              value={toneBlock}
              onChange={(e) => onUpdateToneBlock(e.target.value)}
              className="w-full h-64 p-4 text-sm font-mono text-slate-300 neu-input resize-none focus:ring-1 focus:ring-purple-500/50 transition-all"
              placeholder="Tone block content..."
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded">Editable</span>
            </div>
          </div>

          {/* Feedback & Regen Controls */}
          <div className="flex flex-col md:flex-row gap-4 pt-2">
             <div className="flex-1">
                <input 
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Comment to fix (e.g., 'Make the soap count 8 instead of 6')"
                    className="w-full h-12 px-4 text-sm text-slate-300 neu-input"
                />
             </div>
             <button
                onClick={() => onRegenerate(feedback)}
                disabled={isRegenerating}
                className={`
                    px-6 h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                    ${isRegenerating ? 'neu-pressed opacity-50 cursor-not-allowed' : 'neu-btn text-purple-400 hover:text-purple-300'}
                `}
             >
                {isRegenerating ? (
                   <>
                     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Refining...
                   </>
                ) : (
                   <>
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                     </svg>
                     Regenerate
                   </>
                )}
             </button>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <button
        onClick={onDone}
        className="w-full py-4 rounded-xl font-bold text-base tracking-wide text-white shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
      >
        <span>Approve Tone Block & Generate Prompts</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};