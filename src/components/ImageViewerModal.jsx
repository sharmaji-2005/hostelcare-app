import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

export default function ImageViewerModal({ imageSrc, title, onClose }) {
  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white border-b border-slate-700">
          <div className="text-sm font-semibold truncate pr-4">
            Attachment: {title || 'Complaint Photo Evidence'}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex items-center justify-center bg-black/40 min-h-[300px] max-h-[75vh]">
          <img
            src={imageSrc}
            alt={title || 'Complaint Evidence'}
            className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
          />
        </div>
        <div className="px-4 py-2.5 bg-slate-800/80 text-xs text-slate-400 flex items-center justify-between border-t border-slate-700">
          <span>Captured by resident as visual proof</span>
          <a
            href={imageSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
          >
            <span>Open Original</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
