import React, { useState, useCallback } from 'react';

interface ImageUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  React.useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  return (
    <div className="w-full mb-8">
      <div 
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
        relative p-8 flex flex-col items-center justify-center text-center transition-all duration-300
        ${selectedFile || isDragging ? 'neu-flat' : 'neu-pressed'}
        ${isDragging ? 'border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : ''}
        ${!selectedFile && !isDragging ? 'hover:shadow-none cursor-pointer' : ''}
      `}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        
        {previewUrl ? (
          <div className="relative z-10 w-full pointer-events-none">
             <div className="mb-4">
                 <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-900/20 px-3 py-1 rounded-full">Selected Image</span>
             </div>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-64 mx-auto rounded-lg shadow-2xl border border-slate-700 object-contain"
            />
            <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Tap, Drop, or Paste to replace</p>
          </div>
        ) : (
          <div className="pointer-events-none py-6">
            <div className={`w-16 h-16 bg-[#2B2E33] rounded-full shadow-[5px_5px_10px_#1f2125,-5px_-5px_10px_#373b41] flex items-center justify-center mx-auto mb-4 text-purple-500 transition-transform ${isDragging ? 'scale-110 text-purple-400' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-slate-300 font-bold text-lg tracking-wide">
              {isDragging ? 'Drop Image Here' : 'Upload Screenshot'}
            </h3>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Drag & Drop, Click, or <span className="text-purple-400">Ctrl+V</span> to Paste
            </p>
          </div>
        )}
      </div>
    </div>
  );
};