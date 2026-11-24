import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  AlertTriangle, 
  Check, 
  Sparkles, 
  Image as ImageIcon,
  Zap,
  Droplets,
  Wrench,
  Wifi,
  Utensils,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { CATEGORIES, BLOCKS, CURRENT_STUDENT } from '../data/mockData';

const SAMPLE_PHOTO_PRESETS = [
  {
    name: 'Wobbly Fan / Noise',
    url: 'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Leaking Sink Pipe',
    url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Corridor Cleaning',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Damaged Switchboard',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  }
];

export default function NewComplaintModal({ isOpen, onClose, onSubmitComplaint }) {
  const [category, setCategory] = useState('Electrical');
  const [urgency, setUrgency] = useState('High');
  const [block, setBlock] = useState(CURRENT_STUDENT.block);
  const [room, setRoom] = useState(CURRENT_STUDENT.room);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Please enter a brief complaint title';
    if (!description.trim() || description.trim().length < 10) {
      errs.description = 'Please provide at least 10 characters describing the issue';
    }
    if (!room.trim()) errs.room = 'Room or location is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitComplaint({
      category,
      urgency,
      block,
      room,
      title: title.trim(),
      description: description.trim(),
      image: imageUrl.trim() || null,
      studentName: CURRENT_STUDENT.name,
      studentRoll: CURRENT_STUDENT.rollNo
    });

    onClose();
  };

  const handleQuickPresetFill = () => {
    setCategory('Electrical');
    setUrgency('High');
    setBlock('Block B');
    setRoom('204');
    setTitle('Ceiling fan vibrating & burning smell on speed 4');
    setDescription('The ceiling fan in Room 204 produces a distinct burning electrical smell when operated above speed 3, and the regulator switch feels hot to touch. Poses potential short-circuit hazard.');
    setImageUrl(SAMPLE_PHOTO_PRESETS[0].url);
    setErrors({});
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create local object URL for previewing the user's uploaded file
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10">
              <Wrench className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Raise Maintenance / Facility Complaint</h2>
              <p className="text-xs text-indigo-100">
                Logged by {CURRENT_STUDENT.name} (Roll: {CURRENT_STUDENT.rollNo})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickPresetFill}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-sm"
              title="Auto-fill with sample high urgency electrical issue"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Demo Quick-Fill</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Quick-fill button for mobile */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={handleQuickPresetFill}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Click to Quick-Fill Sample Complaint</span>
            </button>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                    <span className="truncate">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location: Block & Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Hostel Block / Wing <span className="text-red-500">*</span>
              </label>
              <select
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {BLOCKS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Room / Common Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. 204, Mess Hall, Corridor 3F"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 ${
                  errors.room ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.room && <p className="text-xs text-red-500 mt-1">{errors.room}</p>}
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Urgency Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { level: 'Low', desc: 'Minor issue / 48 hrs SLA', color: 'border-slate-200 text-slate-700', active: 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20' },
                { level: 'Medium', desc: 'Needs attention / 24 hrs', color: 'border-slate-200 text-slate-700', active: 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20' },
                { level: 'High', desc: 'Critical / 4 hrs SLA', color: 'border-slate-200 text-slate-700', active: 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-500/20' },
              ].map(({ level, desc, color, active }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setUrgency(level)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    urgency === level ? active : color + ' hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm">{level}</span>
                    {urgency === level && <Check className="w-4 h-4 text-current" />}
                  </div>
                  <div className="text-[11px] opacity-75 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Complaint Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ceiling fan making loud noise on speed 3+"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail, when it occurs, and any previous attempts made..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Image Attachment (Optional) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>Photo Evidence (Optional)</span>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Remove Photo
                </button>
              )}
            </div>

            {imageUrl ? (
              <div className="flex items-center gap-4 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={imageUrl}
                  alt="Attachment preview"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">Photo attached</p>
                  <p className="text-[11px] text-slate-500">Will be visible to Warden and assigned staff</p>
                </div>
              </div>
            ) : (
              <div>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-4 cursor-pointer bg-white transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">Upload a photo from your device</span>
                  <span className="text-[10px] text-slate-400">PNG, JPG, or WEBP up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Quick Presets */}
                <div className="mt-2.5">
                  <span className="text-[11px] font-semibold text-slate-500 mr-2">Or choose a demo preset:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {SAMPLE_PHOTO_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className="px-2 py-1 text-[11px] bg-slate-200/80 hover:bg-indigo-100 hover:text-indigo-700 text-slate-700 rounded-md font-medium transition-colors"
                      >
                        + {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
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
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-colors flex items-center gap-2"
            >
              <span>Submit Complaint</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
