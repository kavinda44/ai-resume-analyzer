import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils' // Assuming this utility is available

// Using Lucide icons for a professional look (you may need to install 'lucide-react' or use SVGs)
// For simplicity, we'll use inline SVGs or placeholders where necessary.
const UploadIcon = () => (
    <svg className="w-10 h-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 7.948M12 16v6M9 19h6"/>
    </svg>
);

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  
  // NOTE: You don't need the useState for the file if you rely on acceptedFiles
  // from useDropzone, but we'll keep the logic clean.
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;
  const hasError = fileRejections.length > 0;

  // Conditional Styling based on state (modern approach)
  const dropzoneClasses = `
    w-full p-12 text-center rounded-xl transition-colors duration-300 border-2 
    ${isDragActive 
        ? 'border-indigo-500 bg-indigo-900/30' // Drag active state
        : hasError 
            ? 'border-red-500 bg-red-900/30' // Error state
            : 'border-gray-700 hover:border-indigo-500 bg-gray-800' // Default state
    }
    ${!file ? 'border-dashed cursor-pointer' : 'border-solid'}
  `;

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the dropzone from re-opening
    onFileSelect?.(null);
  };
  
  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={dropzoneClasses} 
      >
        <input {...getInputProps()} />

        {/* Selected File View (Clean, dark-mode card) */}
        {file ? (
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg shadow-md w-full">
            <div className="flex items-center space-x-4">
                <img src="/images/pdf.png" alt="pdf" className="size-8 flex-shrink-0" />
                <div className="text-left min-w-0">
                    <p className="text-sm font-medium text-white truncate max-w-[200px] md:max-w-xs">
                        {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                        {formatSize(file.size)}
                    </p>
                </div>
            </div>
            
            {/* Remove Button (Styled for Dark Mode) */}
            <button 
                className="p-1.5 rounded-full bg-gray-600 hover:bg-red-500 text-white transition flex-shrink-0" 
                onClick={handleRemoveFile}
            >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
            </button>
          </div>

        ) : (
          /* Default/Empty/Drag State View */
          <div className="text-center space-y-3">
            <UploadIcon />
            <p className="text-lg text-gray-300 font-medium">
                {isDragActive 
                    ? "Drop your PDF file here..."
                    : hasError 
                        ? "File is too large or not a PDF!" // Error feedback
                        : <><span className="text-indigo-400 font-semibold">Click to upload</span> or drag and drop</>
                }
            </p>
            <p className="text-sm text-gray-500">
                PDF format only (max {formatSize(maxFileSize)})
            </p>

            {/* Display error message if file was rejected */}
            {hasError && (
                <p className="text-sm text-red-400 font-medium">
                    Please ensure the file is a PDF and under {formatSize(maxFileSize)}.
                </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default FileUploader