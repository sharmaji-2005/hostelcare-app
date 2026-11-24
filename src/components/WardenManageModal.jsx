import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  UserCheck, 
  AlertTriangle, 
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
  MapPin,
  Calendar
} from 'lucide-react';
import { STAFF_MEMBERS } from '../data/mockData';

const SAMPLE_REMARKS = [
  "Electrician assigned for 4:00 PM today. Parts have been requisitioned from the central store.",
  "Plumber has inspected the line and isolated the valve. Replacement PVC trap is being installed.",
  "Wi-Fi AP firmware updated and channel frequency adjusted. Signal verified.",
  "Housekeeping staff notified; deep cleaning completed and verified by supervisor.",
  "Resolved. Resident confirmed equipment is operating normally."
];

export default function WardenManageModal({ 
  complaint, 
  isOpen, 
  onClose, 
  onUpdateComplaint,
  onViewImage 
}) {
  if (!isOpen || !complaint) return null;

  const [status, setStatus] = useState(complaint.status);
  const [assignedTo, setAssignedTo] = useState(complaint.assignedTo || 'Unassigned');
  const [remarks, setRemarks] = useState(complaint.remarks || '');
  const [customStaff, setCustomStaff] = useState('');

  // Keep state synced with selected complaint
  useEffect(() => {
    if (complaint) {
      setStatus(complaint.status);
      setAssignedTo(complaint.assignedTo || 'Unassigned');
      setRemarks(complaint.remarks || '');
    }
  }, [complaint]);

  const handleSave = (e) => {
    e.preventDefault();
    const finalStaff = assignedTo === 'CUSTOM' ? (customStaff || 'Maintenance Staff') : assignedTo;
    
    onUpdateComplaint(complaint.id, {
      status,
      assignedTo: finalStaff,
      remarks: remarks.trim(),
      resolvedAt: status === 'Resolved' && !complaint.resolvedAt ? new Date().toISOString() : complaint.resolvedAt
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Manage Ticket #{complaint.id}</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  {complaint.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged by {complaint.studentName} ({complaint.block}, Room {complaint.room})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Issue Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {complaint.title}
              </h3>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                complaint.urgency === 'High' ? 'bg-red-100 text-red-700' :
                complaint.urgency === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {complaint.urgency} Urgency
              </span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              {complaint.description}
            </p>

            {complaint.image && (
              <div className="pt-2 flex items-center gap-3">
                <img
                  src={complaint.image}
                  alt="Evidence"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-300 cursor-pointer hover:opacity-90"
                  onClick={() => onViewImage(complaint.image, complaint.title)}
                />
                <button
                  type="button"
                  onClick={() => onViewImage(complaint.image, complaint.title)}
                  className="text-xs text-indigo-600 font-semibold underline hover:text-indigo-800 flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Click to view resident's photo evidence</span>
                </button>
              </div>
            )}
          </div>

          {/* Workflow Status Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Update Status Workflow <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  id: 'Open',
                  label: 'Open / Pending',
                  icon: <Clock className="w-4 h-4 text-blue-600" />,
                  desc: 'Awaiting inspection',
                  active: 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                },
                {
                  id: 'In Progress',
                  label: 'In Progress',
                  icon: <Wrench className="w-4 h-4 text-amber-600" />,
                  desc: 'Staff assigned / Work underway',
                  active: 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                },
                {
                  id: 'Resolved',
                  label: 'Mark Resolved',
                  icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
                  desc: 'Work verified & closed',
                  active: 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                }
              ].map(({ id, label, icon, desc, active }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStatus(id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    status === id ? active : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                    {icon}
                    <span>{label}</span>
                  </div>
                  <div className="text-[11px] opacity-75 mt-0.5 truncate">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Staff Assignment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Assign Staff Member
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Unassigned">Unassigned</option>
              {STAFF_MEMBERS.map((staff) => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
              <option value="CUSTOM">+ Custom Maintenance Vendor</option>
            </select>

            {assignedTo === 'CUSTOM' && (
              <input
                type="text"
                placeholder="Enter contractor/staff name..."
                value={customStaff}
                onChange={(e) => setCustomStaff(e.target.value)}
                className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>

          {/* Official Remarks */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Official Resolution Remark / Student Note
              </label>
              <span className="text-[11px] text-slate-400">
                Immediately visible in Student View
              </span>
            </div>
            
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Electrician assigned for 4:00 PM today. Replacement capacitor dispatched..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Quick remark templates */}
            <div className="mt-2">
              <span className="text-[11px] font-semibold text-slate-500 mr-2">Quick Remark Presets:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {SAMPLE_REMARKS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRemarks(preset)}
                    className="px-2 py-0.5 text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-md transition-colors"
                  >
                    + Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Save & Update Ticket</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
