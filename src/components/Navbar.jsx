import React from 'react';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  RefreshCw, 
  Bell, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  onResetData, 
  openCount, 
  totalComplaints 
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Portal Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Hostel<span className="text-indigo-600">Care</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 hidden sm:inline-block">
                  Demo MVP
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Complaints & Facility Feedback System
              </p>
            </div>
          </div>

          {/* Central Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setCurrentRole('student')}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentRole === 'student'
                  ? 'bg-white text-indigo-700 shadow-sm shadow-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Student Resident Portal"
            >
              <User className="w-4 h-4" />
              <span>Student View</span>
            </button>

            <button
              onClick={() => setCurrentRole('warden')}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentRole === 'warden'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Hostel Warden / Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Warden / Admin</span>
              {openCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  currentRole === 'warden' ? 'bg-indigo-800 text-indigo-100' : 'bg-red-500 text-white'
                }`}>
                  {openCount}
                </span>
              )}
            </button>
          </div>

          {/* Right actions: Demo Reset & User Persona Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onResetData}
              title="Reset state to default demo sample data"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            {currentRole === 'student' ? (
              <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs sm:text-sm border border-indigo-200 shadow-sm">
                  AS
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-800">{CURRENT_STUDENT.name}</div>
                  <div className="text-[11px] text-slate-500 font-medium">Room {CURRENT_STUDENT.room} ({CURRENT_STUDENT.block})</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs sm:text-sm border border-emerald-200 shadow-sm">
                  CW
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-800">Chief Warden Office</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Admin & Maintenance</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
