import React, { useState } from 'react';
import { HistoryItem, ContentType } from '../types';
import { CONTENT_TYPES } from '../constants';

interface HistorySectionProps {
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ history, onRestore, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="neu-flat overflow-hidden border border-slate-700/30 mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left text-slate-400 font-bold tracking-wide hover:text-purple-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>SESSION HISTORY ({history.length})</span>
        </div>
        <svg 
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 space-y-3 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
           {history.slice().reverse().map((item) => (
             <div key={item.id} className="neu-pressed p-4 rounded-xl flex flex-col gap-3 group hover:border border-purple-500/10 transition-colors">
                <div className="flex justify-between items-start">
                    <span className="text-xs text-slate-500 font-mono">
                        {new Date(item.timestamp).toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => onRestore(item)}
                            className="text-xs bg-purple-900/20 text-purple-400 px-3 py-1 rounded-full hover:bg-purple-900/40 transition-colors flex items-center gap-1"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Restore
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id);
                            }}
                            className="text-xs bg-red-900/10 text-red-400 p-1.5 rounded-full hover:bg-red-900/30 transition-colors"
                            title="Delete Session"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="text-xs text-slate-400 line-clamp-2 font-mono bg-[#2B2E33] p-2 rounded border border-slate-800">
                    {item.result.finalToneBlock.substring(0, 150)}...
                </div>

                <div className="flex flex-wrap gap-2">
                    {CONTENT_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(item.result.prompts[type]);
                            }}
                            className="text-[10px] uppercase font-bold text-slate-500 hover:text-white border border-slate-700 px-2 py-1 rounded hover:bg-slate-700 transition-colors"
                            title="Copy Prompt"
                        >
                            Copy {type}
                        </button>
                    ))}
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};