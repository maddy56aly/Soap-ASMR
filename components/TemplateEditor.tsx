import React from 'react';
import { PromptTemplates, ContentType } from '../types';
import { CONTENT_TYPES } from '../constants';

interface TemplateEditorProps {
  templates: PromptTemplates;
  setTemplates: React.Dispatch<React.SetStateAction<PromptTemplates>>;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ templates, setTemplates }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<ContentType | 'ToneBlock'>('ToneBlock');

  const updateMasterPrompt = (type: ContentType, value: string) => {
    setTemplates(prev => ({
      ...prev,
      masterPrompts: {
        ...prev.masterPrompts,
        [type]: value
      }
    }));
  };

  return (
    <div className="neu-flat overflow-hidden mb-6 border border-slate-700/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left text-slate-400 font-bold tracking-wide hover:text-purple-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>CONFIGURE TEMPLATES</span>
        </div>
        <svg 
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setActiveTab('ToneBlock')}
                    className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTab === 'ToneBlock' ? 'neu-btn-active' : 'neu-btn'
                    }`}
                >
                    REF: TONE BLOCK
                </button>
                {CONTENT_TYPES.map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveTab(type)}
                        className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                            activeTab === type ? 'neu-btn-active' : 'neu-btn'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {activeTab === 'ToneBlock' ? (
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Tone Block Reference
                    </label>
                    <textarea
                        value={templates.toneBlockTemplate}
                        onChange={(e) => setTemplates(prev => ({ ...prev, toneBlockTemplate: e.target.value }))}
                        className="w-full h-32 p-4 text-sm font-mono text-slate-400 neu-input focus:outline-none focus:text-slate-200"
                        placeholder="Define tone block structure..."
                    />
                 </div>
            ) : (
                <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Master Prompt: {activeTab}
                    </label>
                    <textarea
                        value={templates.masterPrompts[activeTab as ContentType]}
                        onChange={(e) => updateMasterPrompt(activeTab as ContentType, e.target.value)}
                        className="w-full h-64 p-4 text-sm font-mono text-slate-400 neu-input focus:outline-none focus:text-slate-200"
                        placeholder={`Enter master prompt for ${activeTab}...`}
                    />
                </div>
            )}
        </div>
      )}
    </div>
  );
};