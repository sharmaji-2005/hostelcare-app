import React, { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  ThumbsUp, 
  AlertCircle, 
  Filter, 
  Lock,
  Utensils,
  Droplets,
  Wifi,
  Wrench,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { FEEDBACK_CATEGORIES } from '../data/mockData';

export default function FeedbackAnalytics({ feedbackList }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [minRatingFilter, setMinRatingFilter] = useState('ALL');
  const [acknowledgedItems, setAcknowledgedItems] = useState({});

  // Category statistics
  const categoryStats = FEEDBACK_CATEGORIES.map((cat) => {
    const items = feedbackList.filter((f) => f.category === cat);
    if (items.length === 0) return { category: cat, avg: 0, count: 0, positiveCount: 0 };
    const sum = items.reduce((acc, curr) => acc + curr.rating, 0);
    const positive = items.filter((f) => f.rating >= 4).length;
    return {
      category: cat,
      avg: Number((sum / items.length).toFixed(1)),
      count: items.length,
      positiveCount: positive,
      satisfactionRate: Math.round((positive / items.length) * 100)
    };
  });

  const totalReviews = feedbackList.length;
  const overallAvg = totalReviews > 0
    ? (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const highRatingsCount = feedbackList.filter((f) => f.rating >= 4).length;
  const criticalRatingsCount = feedbackList.filter((f) => f.rating <= 2).length;

  const filteredFeedback = feedbackList.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesRating = minRatingFilter === 'ALL' || item.rating === Number(minRatingFilter);
    return matchesCat && matchesRating;
  });

  const toggleAcknowledge = (id) => {
    setAcknowledgedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Mess Food Quality': return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'Cleanliness': return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'Wi-Fi Speed': return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'Hostel Maintenance': return <Wrench className="w-4 h-4 text-emerald-500" />;
      default: return <Shield className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Overall Rating Score
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900">{overallAvg}</span>
            <span className="text-sm font-semibold text-slate-500">/ 5.0</span>
          </div>
          <div className="flex text-amber-400 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Feedback Logged
          </div>
          <div className="text-3xl font-extrabold text-indigo-700 mt-2">
            {totalReviews}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Across {FEEDBACK_CATEGORIES.length} facility domains
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Positive Reviews (4-5 ★)
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">
            {highRatingsCount}
          </div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            {totalReviews > 0 ? `${Math.round((highRatingsCount / totalReviews) * 100)}% satisfaction` : '0%'}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Critical Alerts (1-2 ★)
          </div>
          <div className="text-3xl font-extrabold text-red-600 mt-2">
            {criticalRatingsCount}
          </div>
          <div className="text-xs text-red-700 font-semibold mt-1">
            Requires warden intervention
          </div>
        </div>

      </div>

      {/* Category Performance Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
          Detailed Performance by Facility Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map(({ category: catName, avg, count, satisfactionRate }) => (
            <div
              key={catName}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5 truncate">
                  {getCategoryIcon(catName)}
                  <span>{catName}</span>
                </span>
                <span className="text-xs font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {avg > 0 ? `${avg} ★` : 'No data'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    avg >= 4 ? 'bg-emerald-500' : avg >= 3 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(avg / 5) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{count} student ratings</span>
                <span className="font-semibold text-slate-700">{satisfactionRate || 0}% positive</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Stream & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Student Suggestions & Feedback Log
            </h3>
            <p className="text-xs text-slate-500">
              Review qualitative feedback and acknowledge items addressed by management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Categories</option>
              {FEEDBACK_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Rating Filter */}
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Star Ratings</option>
              <option value="5">5 Stars only</option>
              <option value="4">4 Stars only</option>
              <option value="3">3 Stars only</option>
              <option value="2">2 Stars (Critical)</option>
              <option value="1">1 Star (Severe)</option>
            </select>
          </div>
        </div>

        {/* Feedback Cards */}
        {filteredFeedback.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No feedback found matching the selected filter criteria.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFeedback.map((fb) => (
              <div
                key={fb.id}
                className={`p-4 rounded-xl border transition-all ${
                  acknowledgedItems[fb.id]
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                      {getCategoryIcon(fb.category)}
                      <span>{fb.category}</span>
                    </span>

                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            fb.rating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => toggleAcknowledge(fb.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                        acknowledgedItems[fb.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{acknowledgedItems[fb.id] ? 'Actioned' : 'Acknowledge'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{fb.comment}"
                </p>

                <div className="mt-2 text-[11px] text-slate-500 font-medium">
                  {fb.isAnonymous ? (
                    <span className="italic flex items-center gap-1 text-slate-400">
                      <Lock className="w-3 h-3" /> Anonymous Resident ({fb.block})
                    </span>
                  ) : (
                    <span>By: <strong className="text-slate-700">{fb.studentName}</strong> ({fb.room})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
