import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, PlayCircle, ShieldCheck, User, CheckCircle2 } from 'lucide-react';

export default function DemoBanner({ currentRole, setCurrentRole, onQuickFillDemoComplaint }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white px-4 py-2.5 sm:py-3 shadow-md border-b border-indigo-700/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-indigo-500/30 text-indigo-300">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-indigo-200 mr-2 uppercase tracking-wide text-[11px] bg-indigo-700/60 px-2 py-0.5 rounded">
              Interactive Demo Guide
            </span>
            <span className="text-slate-200">
              {currentRole === 'student' ? (
                <>
                  You are logged in as <strong>Aarav Sharma (Room B-204)</strong>. Try raising a complaint or submitting mess feedback, then switch to Warden view!
                </>
              ) : (
                <>
                  You are viewing the <strong>Warden / Admin Dashboard</strong>. Update complaint statuses, assign staff, and post resolution notes in real-time!
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {currentRole === 'student' ? (
            <button
              onClick={() => setCurrentRole('warden')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-xs transition-colors shadow-sm"
            >
              <span>Switch to Warden View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentRole('student')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs transition-colors shadow-sm"
            >
              <span>Back to Student View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
            title="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
