import React, { useState } from 'react';
import { 
  Star, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  User, 
  Clock, 
  ThumbsUp, 
  TrendingUp, 
  Lock,
  Utensils,
  Droplets,
  Wifi,
  Wrench,
  Shield
} from 'lucide-react';
import { FEEDBACK_CATEGORIES, CURRENT_STUDENT } from '../data/mockData';

const RATING_LABELS = {
  1: 'Poor / Unsatisfactory',
  2: 'Fair / Needs Improvement',
  3: 'Average / Acceptable',
  4: 'Good / Satisfied',
  5: 'Excellent / Exceeded Expectations'
};

const SAMPLE_QUICK_TAGS = [
  'Mess Breakfast Quality',
  'Dinner Roti Softness',
  'Washroom Hygiene',
  'Hot Geyser Timings',
  'Wi-Fi Speed in Wing A',
  'Night Corridor Lighting'
];

export default function FeedbackSection({ feedbackList, onSubmitFeedback }) {
  const [category, setCategory] = useState(FEEDBACK_CATEGORIES[0]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');

  // Calculate live average ratings per category
  const categoryStats = FEEDBACK_CATEGORIES.map((cat) => {
    const items = feedbackList.filter((f) => f.category === cat);
    if (items.length === 0) return { category: cat, avg: 0, count: 0 };
    const sum = items.reduce((acc, curr) => acc + curr.rating, 0);
    return {
      category: cat,
      avg: Number((sum / items.length).toFixed(1)),
      count: items.length
    };
  });

  const overallAvg = feedbackList.length > 0
    ? (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length).toFixed(1)
    : '0.0';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || comment.trim().length < 5) {
      setError('Please share at least a short comment or suggestion (5+ characters)');
      return;
    }

    onSubmitFeedback({
      category,
      rating,
      comment: comment.trim(),
      isAnonymous,
      studentName: isAnonymous ? 'Anonymous Resident' : CURRENT_STUDENT.name,
      room: isAnonymous ? CURRENT_STUDENT.block : `${CURRENT_STUDENT.block} - ${CURRENT_STUDENT.room}`,
      block: CURRENT_STUDENT.block
    });

    setComment('');
    setError('');
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
    <div className="space-y-8">
      
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Overall Rating Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-indigo-300 mb-1">
              Hostel Community Satisfaction
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-amber-300">{overallAvg}</span>
              <span className="text-sm text-slate-300">/ 5.0</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-indigo-700/60 flex items-center justify-between text-xs text-indigo-200">
            <span>Based on {feedbackList.length} student reviews</span>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Category Ratings Breakdown
          </div>
          <div className="space-y-2.5">
            {categoryStats.map(({ category: catName, avg, count }) => (
              <div key={catName} className="flex items-center gap-3 text-xs">
                <div className="w-36 font-semibold text-slate-700 flex items-center gap-1.5 truncate">
                  {getCategoryIcon(catName)}
                  <span className="truncate">{catName}</span>
                </div>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      avg >= 4 ? 'bg-emerald-500' : avg >= 3 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(avg / 5) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-right font-bold text-slate-800">
                  {avg > 0 ? `${avg} ★` : 'N/A'}
                  <span className="text-[10px] text-slate-400 ml-1">({count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Submit Feedback Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Submit Hostel & Mess Feedback
            </h2>
            <p className="text-xs text-slate-500">
              Help the administration improve food quality, hygiene, and daily hostel amenities.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Category Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Feedback Category
            </label>
            <div className="flex flex-wrap gap-2">
              {FEEDBACK_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 1-5 Star Rating */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Your Rating
              </label>
              <span className="text-xs font-bold text-amber-800">
                {RATING_LABELS[hoverRating || rating]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Suggestions / Comments
              </label>
              <span className="text-[11px] text-slate-400">Be specific and constructive</span>
            </div>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Wednesday dinner paneer was fresh and delicious. Please add curd or buttermilk for lunch in summers..."
              className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 ${
                error ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] font-medium text-slate-400 mr-1">Quick topics:</span>
              {SAMPLE_QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setComment((prev) => prev ? `${prev} - ${tag}` : tag)}
                  className="px-2 py-0.5 text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-md transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Anonymity Toggle & Submit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Submit Anonymously</span>
                </span>
                <span className="text-slate-500 text-[11px] block">
                  Your name and room number will be hidden from the public feed
                </span>
              </div>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Feedback</span>
            </button>
          </div>

        </form>
      </div>

      {/* Recent Feedback Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Recent Student Reviews & Feedback</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {feedbackList.length}
            </span>
          </h3>
          <span className="text-xs text-slate-500">Live community feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </span>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        item.rating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                "{item.comment}"
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1 font-medium text-slate-600">
                  {item.isAnonymous ? (
                    <span className="text-slate-500 italic flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Anonymous Resident ({item.block})
                    </span>
                  ) : (
                    <span>
                      {item.studentName} ({item.room})
                    </span>
                  )}
                </div>
                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
