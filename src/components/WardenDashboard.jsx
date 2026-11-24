import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Droplets, 
  Wifi, 
  Utensils, 
  ShieldAlert, 
  Star, 
  UserCheck, 
  Image as ImageIcon,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { CATEGORIES, BLOCKS } from '../data/mockData';
import FeedbackAnalytics from './FeedbackAnalytics';

export default function WardenDashboard({ 
  complaints, 
  feedbackList, 
  onSelectComplaintForManage,
  onQuickUpdateStatus,
  onViewImage 
}) {
  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [blockFilter, setBlockFilter] = useState('ALL');

  // KPI calculations
  const totalComplaints = complaints.length;
  const openCount = complaints.filter((c) => c.status === 'Open').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;
  
  const overallFeedbackAvg = feedbackList.length > 0
    ? (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length).toFixed(1)
    : '0.0';

  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'ALL' || item.urgency === urgencyFilter;
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesBlock = blockFilter === 'ALL' || item.block === blockFilter;
    const matchesSearch = 
      searchQuery === '' ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesUrgency && matchesCategory && matchesBlock && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Electrical': return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case 'Plumbing': return <Droplets className="w-3.5 h-3.5 text-cyan-500" />;
      case 'Housekeeping': return <Wrench className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Wi-Fi/Internet': return <Wifi className="w-3.5 h-3.5 text-blue-500" />;
      case 'Mess/Food': return <Utensils className="w-3.5 h-3.5 text-orange-500" />;
      default: return <ShieldAlert className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            High
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
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
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

  return (
    <div className="space-y-6">
      
      {/* Top Admin Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Complaints */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Complaints
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              All
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {totalComplaints}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span>{resolvedCount} resolved ({totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0}%)</span>
          </div>
        </div>

        {/* Pending / Open */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pending / Open
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-2">
            {openCount}
          </div>
          <div className="text-xs text-blue-700 font-semibold mt-1">
            {openCount > 0 ? 'Awaiting technician assignment' : 'All tickets assigned'}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              In Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">
            {inProgressCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Active technician work orders
          </div>
        </div>

        {/* Overall Community Rating */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hostel Satisfaction
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{overallFeedbackAvg}</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span>{feedbackList.length} resident reviews logged</span>
          </div>
        </div>

      </div>

      {/* Main Content Card with Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Tab Headers */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50/70 px-6 pt-4 gap-4">
          <button
            onClick={() => setActiveTab('complaints')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'complaints'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Complaints Management</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
              {complaints.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Feedback Analytics</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
              {feedbackList.length}
            </span>
          </button>
        </div>

        {/* Tab Content: Complaints Management */}
        {activeTab === 'complaints' && (
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ticket #, resident name, room, or issue..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Filter Selects */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All Statuses ({totalComplaints})</option>
                  <option value="Open">Open ({openCount})</option>
                  <option value="In Progress">In Progress ({inProgressCount})</option>
                  <option value="Resolved">Resolved ({resolvedCount})</option>
                </select>

                {/* Urgency Filter */}
                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All Urgencies</option>
                  <option value="High">High Urgency</option>
                  <option value="Medium">Medium Urgency</option>
                  <option value="Low">Low Urgency</option>
                </select>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Block Filter */}
                <select
                  value={blockFilter}
                  onChange={(e) => setBlockFilter(e.target.value)}
                  className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All Blocks</option>
                  {BLOCKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Complaints Table */}
            {filteredComplaints.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">No complaints matching filter criteria</h4>
                <p className="text-xs text-slate-500 mt-1">Try resetting the filters or clearing the search query.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th scope="col" className="px-4 py-3.5">Ticket ID</th>
                      <th scope="col" className="px-4 py-3.5">Student & Location</th>
                      <th scope="col" className="px-4 py-3.5">Category & Urgency</th>
                      <th scope="col" className="px-4 py-3.5">Issue Details</th>
                      <th scope="col" className="px-4 py-3.5">Assigned Staff</th>
                      <th scope="col" className="px-4 py-3.5">Status</th>
                      <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white font-medium">
                    {filteredComplaints.map((item) => (
                      <tr 
                        key={item.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Ticket ID & Photo */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                              #{item.id}
                            </span>
                            {item.image && (
                              <button
                                type="button"
                                onClick={() => onViewImage(item.image, item.title)}
                                title="Click to view photo evidence"
                                className="text-indigo-600 hover:text-indigo-800 p-1 hover:bg-indigo-50 rounded"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Student & Location */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-bold text-slate-800">{item.studentName}</div>
                          <div className="text-[11px] text-slate-500 font-normal">
                            {item.block} • Room {item.room}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {item.studentRoll}
                          </div>
                        </td>

                        {/* Category & Urgency */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-1">
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                          </div>
                          <div>{getUrgencyBadge(item.urgency)}</div>
                        </td>

                        {/* Issue Details & Remarks */}
                        <td className="px-4 py-4 max-w-xs">
                          <div className="font-bold text-slate-900 truncate" title={item.title}>
                            {item.title}
                          </div>
                          <div className="text-slate-500 text-xs line-clamp-1 mt-0.5">
                            {item.description}
                          </div>

                          {/* Remarks preview if present */}
                          {item.remarks && (
                            <div className="mt-1.5 text-[11px] text-indigo-900 bg-indigo-50/80 px-2 py-1 rounded-md border border-indigo-100 line-clamp-1">
                              <strong>Note:</strong> {item.remarks}
                            </div>
                          )}
                        </td>

                        {/* Assigned Staff */}
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {item.assignedTo && item.assignedTo !== 'Unassigned' ? (
                            <span className="font-semibold text-slate-800 flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                              <span>{item.assignedTo}</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Unassigned</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                          </div>
                        </td>

                        {/* Action: Manage / Update */}
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => onSelectComplaintForManage(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
                          >
                            <Wrench className="w-3.5 h-3.5 text-indigo-300" />
                            <span>Manage</span>
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* Tab Content: Feedback Analytics */}
        {activeTab === 'analytics' && (
          <div className="p-5 sm:p-6">
            <FeedbackAnalytics feedbackList={feedbackList} />
          </div>
        )}

      </div>

    </div>
  );
}
