import React, { useState, useEffect } from 'react';
import { GeneratedResult, ContentType } from '../types';
import { CONTENT_TYPES } from '../constants';

interface ResultDisplayProps {
  result: GeneratedResult;
  onUpdatePrompt: (type: ContentType, newPrompt: string) => void;
  onRefinePrompt: (type: ContentType, instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  result, 
  onUpdatePrompt, 
  onRefinePrompt,
  isRefining 
}) => {
  const [activeTab, setActiveTab] = useState<ContentType>('Dust Core');
  const [copied, setCopied] = useState(false);
  const [refineInput, setRefineInput] = useState('');

  // Clear refine input when tab changes
  useEffect(() => {
    setRefineInput('');
  }, [activeTab]);

  const copyToClipboard = async () => {
    try {
      const text = result.prompts[activeTab];
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleRefineSubmit = async () => {
    if (!refineInput.trim() || isRefining) return;
    await onRefinePrompt(activeTab, refineInput);
    setRefineInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center mb-2">
          <h2 className="text-purple-400 font-bold text-lg tracking-wide uppercase">
            Step 2: Final Prompts
          </h2>
      </div>

      <div className="neu-flat p-2">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-2 border-b border-slate-700/50 mb-2">
            {CONTENT_TYPES.map(type => (
                <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`
                        px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                        ${activeTab === type 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/30'
                        }
                    `}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center px-4 py-2">
             <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                {activeTab} Prompt
                <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">Editable</span>
             </div>
             <button
                onClick={copyToClipboard}
                className={`
                    px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all
                    ${copied ? 'neu-pressed text-purple-400' : 'neu-btn text-slate-300 hover:text-white'}
                `}
             >
                {copied ? (
                   <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    COPIED
                   </>
                 ) : (
                   <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    COPY PROMPT
                   </>
                 )}
             </button>
        </div>

        {/* Content & Refine */}
        <div className="p-2 space-y-4">
             <textarea
                value={result.prompts[activeTab]}
                onChange={(e) => onUpdatePrompt(activeTab, e.target.value)}
                className="w-full h-96 p-4 text-slate-300 bg-[#25282d] rounded-xl border border-slate-800/50 resize-none font-mono text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-shadow"
             />

             {/* Prompt Specific Refinement */}
             <div className="flex gap-2 items-center">
                 <input
                    type="text"
                    value={refineInput}
                    onChange={(e) => setRefineInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRefineSubmit()}
                    placeholder={`Update ${activeTab} prompt ONLY (e.g., "Change background to blue")`}
                    className="flex-1 h-10 px-4 text-sm text-slate-300 neu-input"
                    disabled={isRefining}
                 />
                 <button 
                    onClick={handleRefineSubmit}
                    disabled={!refineInput.trim() || isRefining}
                    className={`
                        h-10 px-4 rounded-lg text-xs font-bold transition-all
                        ${!refineInput.trim() || isRefining ? 'neu-pressed opacity-50' : 'neu-btn text-purple-400 hover:text-white'}
                    `}
                 >
                    {isRefining ? 'Updating...' : 'Update'}
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};