import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DemoBanner from './components/DemoBanner';
import Toast from './components/Toast';
import StudentDashboard from './components/StudentDashboard';
import FeedbackSection from './components/FeedbackSection';
import WardenDashboard from './components/WardenDashboard';
import NewComplaintModal from './components/NewComplaintModal';
import WardenManageModal from './components/WardenManageModal';
import ImageViewerModal from './components/ImageViewerModal';
import { 
  INITIAL_COMPLAINTS, 
  INITIAL_FEEDBACK, 
  CURRENT_STUDENT 
} from './data/mockData';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  Wrench, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Heart
} from 'lucide-react';

const STORAGE_KEYS = {
  COMPLAINTS: 'hostelcare_complaints_v1',
  FEEDBACK: 'hostelcare_feedback_v1',
  ROLE: 'hostelcare_role_v1'
};

export default function App() {
  // Persistent Role (defaults to student for demo landing)
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'student';
  });

  // Student sub-tabs: 'complaints' | 'feedback'
  const [studentTab, setStudentTab] = useState('complaints');

  // Persistent Complaints
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch (e) {
      console.error('Failed to parse saved complaints', e);
      return INITIAL_COMPLAINTS;
    }
  });

  // Persistent Feedback
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
    } catch (e) {
      console.error('Failed to parse saved feedback', e);
      return INITIAL_FEEDBACK;
    }
  });

  // Modal and viewer states
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [managingComplaint, setManagingComplaint] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Toast Helper
  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add new complaint
  const handleAddComplaint = (formData) => {
    // Generate next ticket ID
    const nextNum = 100 + complaints.length + 1;
    const newId = `HC-${nextNum}`;

    const newTicket = {
      id: newId,
      ...formData,
      status: 'Open',
      createdAt: new Date().toISOString(),
      assignedTo: 'Unassigned',
      remarks: '',
      rating: null,
      resolvedAt: null
    };

    setComplaints((prev) => [newTicket, ...prev]);
    addToast(
      'success',
      `Complaint #${newId} Submitted!`,
      `Your ${formData.category} issue in ${formData.block} Room ${formData.room} has been queued for warden review.`
    );
  };

  // Update complaint (from warden)
  const handleUpdateComplaint = (id, updates) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );

    addToast(
      'success',
      `Ticket #${id} Updated`,
      `Status changed to "${updates.status}". Remarks and staff assignment have been updated.`
    );
  };

  // Rate resolution satisfaction (from student)
  const handleRateResolution = (id, rating) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rating } : c))
    );

    addToast(
      'success',
      'Resolution Feedback Recorded',
      `Thank you! You rated the resolution of Ticket #${id} as ${rating} stars.`
    );
  };

  // Reopen resolved complaint (from student)
  const handleReopenComplaint = (id, reason) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'Open',
              remarks: c.remarks
                ? `${c.remarks} [Student Reopened: ${reason}]`
                : `Student Reopened: ${reason}`,
              resolvedAt: null,
              rating: null
            }
          : c
      )
    );

    addToast(
      'warning',
      `Ticket #${id} Reopened`,
      'The complaint has been reopened and returned to Open/Pending status for the warden team.'
    );
  };

  // Submit Feedback
  const handleSubmitFeedback = (data) => {
    const nextId = `FB-${200 + feedbackList.length + 1}`;
    const newFeedback = {
      id: nextId,
      ...data,
      createdAt: new Date().toISOString()
    };

    setFeedbackList((prev) => [newFeedback, ...prev]);
    addToast(
      'success',
      'Feedback Submitted Successfully',
      `Your review for ${data.category} has been added to the community log.`
    );
  };

  // Reset to initial mock data
  const handleResetData = () => {
    setComplaints(INITIAL_COMPLAINTS);
    setFeedbackList(INITIAL_FEEDBACK);
    localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
    addToast('info', 'Demo Data Reset', 'Restored default demo complaints and feedback items.');
  };

  const openCount = complaints.filter((c) => c.status === 'Open').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased">
      
      {/* Top Navbar with Role Switcher & Branding */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onResetData={handleResetData}
        openCount={openCount}
        totalComplaints={complaints.length}
      />

      {/* Interactive Demo Guide Banner */}
      <DemoBanner
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {currentRole === 'student' ? (
          <div className="space-y-6">
            
            {/* Student View Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStudentTab('complaints')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    studentTab === 'complaints'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  <span>My Complaints</span>
                </button>

                <button
                  onClick={() => setStudentTab('feedback')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    studentTab === 'feedback'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Hostel & Mess Feedback</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-extrabold">
                    {feedbackList.length}
                  </span>
                </button>
              </div>

              <div className="hidden sm:block text-xs font-semibold text-slate-500">
                Logged in as <span className="text-slate-800 font-bold">{CURRENT_STUDENT.name}</span>
              </div>
            </div>

            {/* Tab 1: Complaints Dashboard */}
            {studentTab === 'complaints' && (
              <StudentDashboard
                complaints={complaints}
                onOpenNewComplaintModal={() => setIsNewComplaintOpen(true)}
                onRateResolution={handleRateResolution}
                onReopenComplaint={handleReopenComplaint}
                onViewImage={(url, title) => setViewingImage({ url, title })}
              />
            )}

            {/* Tab 2: Feedback & Mess Rating */}
            {studentTab === 'feedback' && (
              <FeedbackSection
                feedbackList={feedbackList}
                onSubmitFeedback={handleSubmitFeedback}
              />
            )}

          </div>
        ) : (
          /* Warden / Admin Dashboard */
          <WardenDashboard
            complaints={complaints}
            feedbackList={feedbackList}
            onSelectComplaintForManage={(item) => setManagingComplaint(item)}
            onViewImage={(url, title) => setViewingImage({ url, title })}
          />
        )}

      </main>

      {/* Modals & Dialogs */}
      <NewComplaintModal
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
        onSubmitComplaint={handleAddComplaint}
      />

      <WardenManageModal
        complaint={managingComplaint}
        isOpen={Boolean(managingComplaint)}
        onClose={() => setManagingComplaint(null)}
        onUpdateComplaint={handleUpdateComplaint}
        onViewImage={(url, title) => setViewingImage({ url, title })}
      />

      <ImageViewerModal
        imageSrc={viewingImage?.url}
        title={viewingImage?.title}
        onClose={() => setViewingImage(null)}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              H
            </div>
            <span className="font-bold text-slate-800">HostelCare Portal</span>
            <span>— Campus Residence Facility & Grievance Management</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Reset Demo State
            </button>
            <span>•</span>
            <span>Room SLA: 24-48 Hours</span>
            <span>•</span>
            <span className="text-slate-400">Version 1.0 Demo MVP</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
