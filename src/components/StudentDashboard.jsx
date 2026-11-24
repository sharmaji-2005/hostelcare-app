import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Zap, 
  Droplets, 
  Wifi, 
  Utensils, 
  ShieldAlert, 
  Image as ImageIcon,
  MessageSquare,
  Star,
  RotateCcw,
  UserCheck,
  Calendar,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES, CURRENT_STUDENT } from '../data/mockData';

export default function StudentDashboard({ 
  complaints, 
  onOpenNewComplaintModal, 
  onRateResolution, 
  onReopenComplaint,
  onViewImage 
}) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [reopenPromptId, setReopenPromptId] = useState(null);
  const [reopenReason, setReopenReason] = useState('');

  // Filter complaints that belong to the current student (or show all in demo if desired, but user PRD says "showing the student's active and resolved complaints")
  // Let's filter by studentRoll OR show student-relevant items:
  const studentComplaints = complaints.filter(
    (c) => c.studentRoll === CURRENT_STUDENT.rollNo || c.studentName === CURRENT_STUDENT.name
  );

  const filteredComplaints = studentComplaints.filter((c) => {
    const matchesStatus = 
      statusFilter === 'ALL' || c.status.toUpperCase() === statusFilter.toUpperCase();
    const matchesCategory = 
      categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesSearch = 
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const openCount = studentComplaints.filter((c) => c.status === 'Open').length;
  const inProgressCount = studentComplaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = studentComplaints.filter((c) => c.status === 'Resolved').length;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Electrical': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Plumbing': return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'Housekeeping': return <Wrench className="w-4 h-4 text-emerald-500" />;
      case 'Wi-Fi/Internet': return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'Mess/Food': return <Utensils className="w-4 h-4 text-orange-500" />;
      default: return <ShieldAlert className="w-4 h-4 text-purple-500" />;
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            High Urgency
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Open
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <Wrench className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            In Progress
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const handleConfirmReopen = (complaintId) => {
    if (!reopenReason.trim()) return;
    onReopenComplaint(complaintId, reopenReason);
    setReopenPromptId(null);
    setReopenReason('');
  };

  return (
    <div className="space-y-6">
      
      {/* Student Welcome & Top Stats */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-indigo-100">
                Resident Portal
              </span>
              <span className="text-xs text-indigo-200">
                {CURRENT_STUDENT.block} • Room {CURRENT_STUDENT.room}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {CURRENT_STUDENT.name}
            </h1>
            <p className="text-sm text-indigo-200 mt-1 max-w-xl">
              Track maintenance tickets in real-time, get notified on warden remarks, or raise a new facility request.
            </p>
          </div>

          <button
            onClick={onOpenNewComplaintModal}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5 text-indigo-700" />
            <span>Raise a Complaint</span>
          </button>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-indigo-600/40">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
            <div className="text-xs text-indigo-200 font-medium">Open / Pending</div>
            <div className="text-xl sm:text-2xl font-extrabold mt-0.5 text-blue-200">{openCount}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
            <div className="text-xs text-indigo-200 font-medium">In Progress</div>
            <div className="text-xl sm:text-2xl font-extrabold mt-0.5 text-amber-200">{inProgressCount}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
            <div className="text-xs text-indigo-200 font-medium">Resolved</div>
            <div className="text-xl sm:text-2xl font-extrabold mt-0.5 text-emerald-200">{resolvedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'ALL', label: 'All Tickets', count: studentComplaints.length },
              { id: 'OPEN', label: 'Open', count: openCount },
              { id: 'IN PROGRESS', label: 'In Progress', count: inProgressCount },
              { id: 'RESOLVED', label: 'Resolved', count: resolvedCount }
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setStatusFilter(id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  statusFilter === id
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label} <span className="opacity-70 ml-1">({count})</span>
              </button>
            ))}
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by ID (#HC-101), keyword, or problem description..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Complaints List / Cards */}
      {filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No complaints found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
            {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL'
              ? 'No complaints matched your active filters. Try clearing the filters.'
              : 'You have not raised any complaints yet, or all your issues have been resolved.'}
          </p>
          <button
            onClick={onOpenNewComplaintModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Raise a New Issue</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Header: Ticket ID, Category, Urgency, Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                    #{item.id}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </span>

                  {getUrgencyBadge(item.urgency)}
                </div>

                <div>
                  {getStatusBadge(item.status)}
                </div>
              </div>

              {/* Body: Title, Location & Description */}
              <div className="mt-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.block}, Room {item.room}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Photo Evidence Thumbnail (if present) */}
              {item.image && (
                <div className="mt-3.5 flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200 max-w-md">
                  <img
                    src={item.image}
                    alt="Complaint photo"
                    className="w-12 h-12 rounded-lg object-cover cursor-pointer hover:opacity-90 border border-slate-300"
                    onClick={() => onViewImage(item.image, item.title)}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-700 block truncate">
                      Photo Evidence Attached
                    </span>
                    <button
                      type="button"
                      onClick={() => onViewImage(item.image, item.title)}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium underline flex items-center gap-1"
                    >
                      Click to view full photo
                    </button>
                  </div>
                </div>
              )}

              {/* Official Warden Remarks Box */}
              {item.remarks ? (
                <div className="mt-4 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Official Warden Remark</span>
                    </span>
                    {item.assignedTo && item.assignedTo !== 'Unassigned' && (
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                        {item.assignedTo}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                    "{item.remarks}"
                  </p>
                </div>
              ) : (
                item.assignedTo && item.assignedTo !== 'Unassigned' && (
                  <div className="mt-3 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Assigned to: <strong className="text-slate-800">{item.assignedTo}</strong></span>
                  </div>
                )
              )}

              {/* Resolution Action Section (FR-2.3) */}
              {item.status === 'Resolved' && (
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Issue marked as Resolved</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Rate your resolution satisfaction or reopen if the problem continues.
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Star Rating for Resolution */}
                    <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-[11px] font-bold text-slate-600 mr-1">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => onRateResolution(item.id, star)}
                          title={`Rate ${star} star`}
                          className="p-0.5 hover:scale-125 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              item.rating && item.rating >= star
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300 hover:text-amber-400'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Reopen Button */}
                    <button
                      onClick={() => setReopenPromptId(reopenPromptId === item.id ? null : item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reopen</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Reopen Prompt Modal/Drawer */}
              {reopenPromptId === item.id && (
                <div className="mt-3 p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-2">
                  <div className="text-xs font-bold text-red-900">
                    Why are you reopening Ticket #{item.id}?
                  </div>
                  <input
                    type="text"
                    value={reopenReason}
                    onChange={(e) => setReopenReason(e.target.value)}
                    placeholder="e.g. Issue recurred this morning, fan still shaking..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setReopenPromptId(null)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirmReopen(item.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Confirm Reopen Issue
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Timestamp */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Submitted on {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {item.resolvedAt && (
                  <span className="text-emerald-700 font-medium">
                    Resolved on {new Date(item.resolvedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
