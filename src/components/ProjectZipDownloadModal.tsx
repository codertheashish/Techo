import React, { useState, useEffect } from 'react';
import { Download, Archive, CheckCircle2, Terminal, FolderTree, Sparkles, X, FileCode2, Copy, Check } from 'lucide-react';

interface ProjectZipDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ZipInfo {
  filename: string;
  sizeMb: string;
  sizeBytes: number;
  lastModified: string;
  downloadUrl: string;
}

export const ProjectZipDownloadModal: React.FC<ProjectZipDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [zipInfo, setZipInfo] = useState<ZipInfo | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/project-zip-info')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setZipInfo(data);
          }
        })
        .catch(() => {
          // fallback
          setZipInfo({
            filename: 'athletic-performance-ai-studio.zip',
            sizeMb: '5.6',
            sizeBytes: 5830763,
            lastModified: new Date().toISOString(),
            downloadUrl: '/api/download-project-zip',
          });
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = '/api/download-project-zip';
    link.setAttribute('download', 'athletic-performance-ai-studio.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#eef2f6] rounded-3xl p-6 sm:p-8 shadow-[12px_12px_30px_rgba(166,180,200,0.6),-10px_-10px_25px_rgba(255,255,255,0.95)] border border-white/80 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-lime-500 to-emerald-600 text-white shadow-md">
            <Archive className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Export Complete Project ZIP
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Self-contained, production-ready codebase with full 200+ games & AI video engine
            </p>
          </div>
        </div>

        {/* Download Action Card */}
        <div className="neu-sunken rounded-2xl p-5 mb-6 border border-slate-300/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-slate-900">
                  {zipInfo?.filename || 'athletic-performance-ai-studio.zip'}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-lime-100 text-lime-800 border border-lime-300">
                  ~{zipInfo?.sizeMb || '5.6'} MB
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Includes all React frontend components, Express API server, assets, types, & dependencies.
              </p>
            </div>

            <button
              onClick={triggerDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-lime-600 hover:bg-lime-700 active:scale-95 text-white font-bold text-sm shadow-[0_4px_14px_rgba(101,163,13,0.35)] transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Downloading...' : 'Download ZIP File'}</span>
            </button>
          </div>
        </div>

        {/* What is Included in this Zip */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-lime-600" />
            <span>Package Contents & Structure</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-white/70 border border-slate-200 flex items-start gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-900 font-semibold">230+ Games & Sports Engine</strong>
                <span className="text-[11px] text-slate-500">Categorized biomechanics, kinetic foci & fault detection</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-slate-200 flex items-start gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-900 font-semibold">AI Video Recognition & Calibration</strong>
                <span className="text-[11px] text-slate-500">Gemini 3.8 Flash multi-modal video audit & trainer</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-slate-200 flex items-start gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-900 font-semibold">Daily Routine & Habit Scheduler</strong>
                <span className="text-[11px] text-slate-500">Chronobiology-tuned circadian & athletic routine generator</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-slate-200 flex items-start gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-900 font-semibold">3D Posture & Form Guide</strong>
                <span className="text-[11px] text-slate-500">Interactive skeletal camera, telemetry graphs & coach cues</span>
              </div>
            </div>
          </div>
        </div>

        {/* How to run locally */}
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-600" />
            <span>How to Run Locally in 3 Steps</span>
          </h3>

          <div className="rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs space-y-3 shadow-inner">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="text-slate-400"># 1. Unzip the downloaded project</span>
              <button 
                onClick={() => handleCopy('unzip athletic-performance-ai-studio.zip -d athletic-performance', 'step1')}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                title="Copy command"
              >
                {copiedStep === 'step1' ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <code className="block text-lime-300">
              unzip athletic-performance-ai-studio.zip -d athletic-performance<br />
              cd athletic-performance
            </code>

            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 pt-1">
              <span className="text-slate-400"># 2. Install dependencies & configure API key</span>
              <button 
                onClick={() => handleCopy('npm install && cp .env.example .env', 'step2')}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                title="Copy command"
              >
                {copiedStep === 'step2' ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <code className="block text-lime-300">
              npm install<br />
              cp .env.example .env <span className="text-slate-500"># add GEMINI_API_KEY</span>
            </code>

            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 pt-1">
              <span className="text-slate-400"># 3. Start local development server</span>
              <button 
                onClick={() => handleCopy('npm run dev', 'step3')}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                title="Copy command"
              >
                {copiedStep === 'step3' ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <code className="block text-lime-300">
              npm run dev <span className="text-slate-500"># launches at http://localhost:3000</span>
            </code>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-300/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={triggerDownload}
            className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .ZIP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
