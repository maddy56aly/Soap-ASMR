import React, { useState, useEffect, useCallback } from 'react';
import { TemplateEditor } from './components/TemplateEditor';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { ToneBlockReview } from './components/ToneBlockReview';
import { HistorySection } from './components/HistorySection';
import { extractToneBlock, rewriteMasterPrompt, refinePrompt } from './services/geminiService';
import { DEFAULT_MASTER_PROMPTS, REFERENCE_TONE_BLOCK, CONTENT_TYPES } from './constants';
import { AppStatus, GeneratedResult, PromptTemplates, ContentType, HistoryItem } from './types';

const App: React.FC = () => {
  // Load templates
  const [templates, setTemplates] = useState<PromptTemplates>(() => {
    const saved = localStorage.getItem('soapASMRTemplates_v2');
    return saved ? JSON.parse(saved) : {
      toneBlockTemplate: REFERENCE_TONE_BLOCK,
      masterPrompts: DEFAULT_MASTER_PROMPTS,
    };
  });

  useEffect(() => {
    localStorage.setItem('soapASMRTemplates_v2', JSON.stringify(templates));
  }, [templates]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // App State
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [toneBlock, setToneBlock] = useState<string>('');
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  // Tracks if the current view was restored from history to prevent duplicates
  const [loadedHistoryId, setLoadedHistoryId] = useState<string | null>(null);
  const [isRefiningPrompt, setIsRefiningPrompt] = useState(false);

  // Trigger Tone Block Extraction when file is selected
  const handleFileSelect = useCallback(async (file: File) => {
    setSelectedFile(file);
    setStatus(AppStatus.ANALYZING_TONE);
    setErrorMsg(null);
    setResult(null);
    setToneBlock('');
    setLoadedHistoryId(null); // Reset history tracking on new file

    try {
       const extracted = await extractToneBlock(file, templates.toneBlockTemplate);
       setToneBlock(extracted);
       setStatus(AppStatus.REVIEW_TONE);
    } catch (err: any) {
        console.error(err);
        setStatus(AppStatus.ERROR);
        setErrorMsg("Failed to analyze image. Please try again.");
    }
  }, [templates.toneBlockTemplate]);

  // Global Paste Handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
      
      // If dropping into the specific tone block editor, let default behavior happen? 
      if (isInput) return; // Don't intercept if typing in a field

      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          e.preventDefault();
          handleFileSelect(file);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFileSelect]);


  const handleRegenerateTone = async (feedback: string) => {
      if (!selectedFile) return;
      setStatus(AppStatus.ANALYZING_TONE);
      try {
        const extracted = await extractToneBlock(selectedFile, templates.toneBlockTemplate, feedback);
        setToneBlock(extracted);
        setStatus(AppStatus.REVIEW_TONE);
      } catch (err: any) {
          console.error(err);
          setStatus(AppStatus.REVIEW_TONE);
          setErrorMsg("Failed to regenerate. " + err.message);
      }
  };

  const handleGeneratePrompts = async () => {
    setStatus(AppStatus.GENERATING_PROMPTS);
    setErrorMsg(null);
    setLoadedHistoryId(null); // New generation means it's a new session candidate

    try {
        const promises = CONTENT_TYPES.map(async (type) => {
            const masterTemplate = templates.masterPrompts[type];
            // Rewrite the master prompt using the confirmed tone block
            const rewritten = await rewriteMasterPrompt(toneBlock, masterTemplate);
            return { type, prompt: rewritten };
        });

        const results = await Promise.all(promises);
        
        const finalPrompts: Record<ContentType, string> = {} as any;
        results.forEach(r => {
            finalPrompts[r.type as ContentType] = r.prompt;
        });

        setResult({
            prompts: finalPrompts,
            finalToneBlock: toneBlock
        });
        setStatus(AppStatus.SUCCESS);

    } catch (err: any) {
        console.error(err);
        setStatus(AppStatus.REVIEW_TONE);
        setErrorMsg("Failed to generate master prompts. " + err.message);
    }
  };

  const handleRefinePrompt = async (type: ContentType, instruction: string) => {
      if (!result) return;
      setIsRefiningPrompt(true);
      setErrorMsg(null);
      // If we refine, it becomes a new session content essentially, so we clear loadedHistoryId
      // to ensure it gets saved if user clicks "New Session" later.
      setLoadedHistoryId(null); 

      try {
        const currentPrompt = result.prompts[type];
        const updatedPrompt = await refinePrompt(currentPrompt, instruction);
        
        setResult(prev => {
            if (!prev) return null;
            return {
                ...prev,
                prompts: {
                    ...prev.prompts,
                    [type]: updatedPrompt
                }
            };
        });
      } catch (err: any) {
          console.error(err);
          setErrorMsg(`Failed to refine ${type} prompt. ` + err.message);
      } finally {
          setIsRefiningPrompt(false);
      }
  };

  const handleManualPromptUpdate = (type: ContentType, newPrompt: string) => {
      if (!result) return;
      setLoadedHistoryId(null); // Modified, so treated as new
      setResult(prev => {
          if (!prev) return null;
          return {
              ...prev,
              prompts: {
                  ...prev.prompts,
                  [type]: newPrompt
              }
          };
      });
  };

  const handleNewSession = () => {
    // Only save to history if we have a result AND it wasn't just restored from history without changes
    if (result && !loadedHistoryId) {
        const newItem: HistoryItem = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            result: result
        };
        setHistory(prev => [...prev, newItem]);
    }

    // Reset State
    setSelectedFile(null);
    setToneBlock('');
    setResult(null);
    setErrorMsg(null);
    setStatus(AppStatus.IDLE);
    setLoadedHistoryId(null);
  };

  const handleRestoreFromHistory = (item: HistoryItem) => {
      setToneBlock(item.result.finalToneBlock);
      setResult(item.result);
      setStatus(AppStatus.SUCCESS);
      setSelectedFile(null); 
      setLoadedHistoryId(item.id); // Mark as loaded from history
  };

  const handleDeleteHistory = (id: string) => {
      setHistory(prev => prev.filter(item => item.id !== id));
      // If currently viewing the deleted item, treat current view as unsaved
      if (loadedHistoryId === id) {
          setLoadedHistoryId(null);
      }
  };

  return (
    <div className="min-h-screen bg-[#2B2E33] text-[#E2E8F0] pb-20 font-sans selection:bg-purple-500/30 selection:text-white">
      
      {/* Neumorphic Header */}
      <header className="sticky top-0 z-50 bg-[#2B2E33] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl neu-flat flex items-center justify-center text-purple-400 font-bold text-xl">
              S
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-200">
              Soap<span className="text-purple-400">ASMR</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] font-bold tracking-widest uppercase text-slate-500">
                AI Prompt Workflow
            </div>
            
            {status !== AppStatus.IDLE && (
                <button 
                    onClick={handleNewSession}
                    className="neu-btn px-4 py-2 text-xs font-bold text-purple-400 flex items-center gap-2 hover:text-white"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    NEW SESSION
                </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image & Config */}
          <div className="lg:col-span-5 space-y-8">
            <ImageUpload 
                selectedFile={selectedFile} 
                onFileSelect={handleFileSelect} 
            />

            {/* Status Indicators for Step 1 - Only show large spinner on initial analysis */}
            {status === AppStatus.ANALYZING_TONE && !toneBlock && (
                <div className="neu-pressed p-6 flex flex-col items-center justify-center gap-3 text-purple-400 animate-pulse">
                     <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-bold tracking-wide text-sm">ANALYZING VISUALS...</span>
                </div>
            )}

             {/* Template Settings */}
             <div className="pt-4 border-t border-slate-700/50">
                 <TemplateEditor 
                    templates={templates} 
                    setTemplates={setTemplates} 
                  />
             </div>
             
             {/* History Section */}
             <HistorySection 
                history={history} 
                onRestore={handleRestoreFromHistory} 
                onDelete={handleDeleteHistory}
             />
          </div>

          {/* Right Column: Workflow Steps */}
          <div className="lg:col-span-7">
             {errorMsg && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium text-center">
                  {errorMsg}
                </div>
              )}

            {(status === AppStatus.REVIEW_TONE || status === AppStatus.GENERATING_PROMPTS || status === AppStatus.SUCCESS || (status === AppStatus.ANALYZING_TONE && toneBlock !== '')) && (
                 <ToneBlockReview 
                    toneBlock={toneBlock}
                    onUpdateToneBlock={setToneBlock}
                    onRegenerate={handleRegenerateTone}
                    onDone={handleGeneratePrompts}
                    isRegenerating={status === AppStatus.ANALYZING_TONE} 
                 />
            )}
            
            {status === AppStatus.GENERATING_PROMPTS && (
                 <div className="mt-8 neu-flat p-8 flex flex-col items-center justify-center text-center space-y-4">
                     <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
                     <div>
                        <h3 className="text-lg font-bold text-white">Generating Master Prompts</h3>
                        <p className="text-slate-400 text-sm">Applying visual data to all content types...</p>
                     </div>
                 </div>
            )}

            {status === AppStatus.SUCCESS && result && (
                <div className="mt-8">
                     <ResultDisplay 
                        result={result} 
                        onUpdatePrompt={handleManualPromptUpdate}
                        onRefinePrompt={handleRefinePrompt}
                        isRefining={isRefiningPrompt}
                     />
                </div>
            )}

            {status === AppStatus.IDLE && !selectedFile && (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 min-h-[400px] neu-pressed opacity-50 rounded-2xl">
                <div className="w-20 h-20 rounded-full neu-flat flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-lg font-bold">Waiting for input</p>
                <p className="text-sm mt-2">Paste screenshot (Ctrl+V) or Drop Image</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;