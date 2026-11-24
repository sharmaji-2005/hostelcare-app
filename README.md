# HostelCare — Hostel Complaints & Feedback System (Demo Web Application)

A modern, responsive single-page web application designed for hostel residents (students), hostel wardens, and maintenance administration to log, track, and resolve facility complaints while gathering recurring mess and amenity feedback.

Built with **React**, **Tailwind CSS**, and **Lucide Icons**, configured with persistent local storage and pre-populated realistic mock data for zero-setup live demonstrations.

---

## 🌟 Key Features

### 1. Instant Role Switcher (Top Navbar)
- Toggle seamlessly between **Student View** and **Admin / Warden View** without requiring database credentials or backend login.
- Real-time indicator displaying the count of open/unassigned tickets in Warden mode.
- One-click **Reset Demo Data** button to restore sample tickets and ratings back to their initial state at any point during presentations.

### 2. Student Resident Portal
- **Overview & Stats**: Live counters for Open / Pending, In Progress, and Resolved complaints submitted by the resident.
- **Filterable & Searchable Ticket List**: Filter by ticket status (`All`, `Open`, `In Progress`, `Resolved`) or category, plus instant search by keyword or Ticket ID (e.g., `#HC-101`).
- **Color-Coded Status & Urgency**:
  - Status badges: `Open` (Blue), `In Progress` (Amber/Animated), `Resolved` (Emerald).
  - Urgency badges: `High` (Critical, 4h SLA), `Medium` (24h SLA), `Low` (48h SLA).
- **Raise a Complaint Modal**:
  - Category selection: Electrical, Plumbing, Housekeeping, Wi-Fi/Internet, Mess/Food, Security/Other.
  - Location selection: Block (Block A-D) and Room Number / Common Area.
  - Urgency level selector.
  - Description textarea with validation.
  - **Photo Evidence Attachment**: Upload from device with thumbnail preview or select from quick demo presets (e.g. Wobbly Fan, Leaking Sink Pipe, Damaged Switchboard).
  - **Demo Quick-Fill button**: Pre-populates a sample complaint in one click for instant live demos.
- **Resolution Feedback & Reopen (PRD FR-2.3)**:
  - Once marked `Resolved`, residents can give a 1-to-5 star resolution rating.
  - "Reopen Issue" button with prompt if the issue recurs or was not adequately fixed, returning the ticket to `Open` status and alerting the warden team.
- **Hostel & Mess Feedback Module**:
  - 1-to-5 star rating system with interactive hover labels (*Poor*, *Fair*, *Good*, *Very Good*, *Excellent*).
  - Anonymous toggle option to hide resident name and room number.
  - Quick topic tags for frequent mess and hostel issues (*Mess Breakfast Quality*, *Washroom Hygiene*, *Hot Geyser Timings*).
  - Live community rating averages and feedback stream.

### 3. Warden / Admin Management Portal
- **High-Level KPI Summary Cards**:
  - Total Complaints registered across all wings.
  - Pending / Open tickets awaiting technician assignment.
  - In Progress tickets with active technicians.
  - Overall Hostel & Mess Satisfaction rating (e.g. 4.2 / 5.0).
- **Complaints Management Board / Table**:
  - Filter across Status, Urgency, Category, and Hostel Block simultaneously.
  - Search by ticket ID, resident roll number, student name, or issue title.
  - View resident details, contact, room number, and photo evidence.
  - **Manage Ticket Modal**:
    - Update workflow status (`Open` ➔ `In Progress` ➔ `Resolved`).
    - Assign maintenance staff (e.g., *Electrician - Ramesh Kumar*, *Plumber - Dinesh Sharma*, *IT Network Team - Vikas*, or custom vendors).
    - Write official resolution remarks with quick preset templates that reflect immediately in the Student View.
- **Feedback Analytics Tab**:
  - Category-by-category satisfaction breakdown with visual progress bars.
  - Percentage of positive vs. critical ratings.
  - Student suggestions log with an **"Acknowledge / Actioned"** workflow toggle for wardens.

### 4. Interactive Polish & Persistence
- **Local Storage Sync**: All complaints created, statuses changed, remarks posted, and feedback submitted are persisted across page refreshes and role switches.
- **Subtle Toast Notifications**: Visual feedback for actions (complaint submission, ticket resolution, status changes, and reopening).
- **Interactive Demo Guide Banner**: Top banner guiding users through the end-to-end demo flow.

---

## 🚀 Live Demo Walkthrough Script

Follow these steps to present the app to hostel administration or student peers:

1. **Step 1 — Student View**:
   - Notice the initial pre-populated complaints for *Aarav Sharma (Room B-204)*.
   - Click **"Raise a Complaint"** ➔ click **"Demo Quick-Fill"** (or fill your own) ➔ Click **Submit Complaint**.
   - Notice the toast notification and new ticket `HC-107` appearing in Open status.
   - Switch to the **Hostel & Mess Feedback** tab ➔ Rate 5 stars for *Mess Food Quality* ➔ Check *Submit Anonymously* ➔ Click **Post Feedback**.
2. **Step 2 — Switch to Warden View**:
   - In the top navbar, click **"Warden / Admin"**.
   - Notice the KPI cards update immediately with the new complaint.
   - Find the newly submitted ticket in the management table ➔ Click **"Manage"**.
   - Change status to **"In Progress"**, assign **"Electrician - Ramesh Kumar"**, and select or enter a remark: *"Electrician dispatched for 4:00 PM today"*.
   - Click **Save & Update Ticket**.
3. **Step 3 — Verify in Student View**:
   - Switch back to **"Student View"** in the top navbar.
   - Notice the ticket status is now **In Progress**, showing Ramesh Kumar assigned and displaying the official warden note in the card!

---

## 🛠️ Project Structure

```
hostelcare-app/
├── public/
├── src/
│   ├── components/
│   │   ├── DemoBanner.jsx            # Guided demo notification banner
│   │   ├── FeedbackAnalytics.jsx     # Admin analytics & category scorecards
│   │   ├── FeedbackSection.jsx       # Student feedback submission & community log
│   │   ├── ImageViewerModal.jsx      # Full-size evidence photo lightbox
│   │   ├── Navbar.jsx                # Branding, role switcher pill & reset button
│   │   ├── NewComplaintModal.jsx     # Complaint submission with photo presets
│   │   ├── StudentDashboard.jsx      # Student tickets, badges, rating & reopen
│   │   ├── Toast.jsx                 # Animated user action notifications
│   │   ├── WardenDashboard.jsx       # Admin KPIs, filtering & ticket table
│   │   └── WardenManageModal.jsx      # Workflow status, staff assignment & remarks
│   ├── data/
│   │   └── mockData.js               # Seed complaints, feedback & staff rosters
│   ├── App.jsx                       # Root state management & localStorage sync
│   ├── index.css                     # Tailwind CSS directives & custom fonts
│   └── main.jsx                      # React 18 DOM mount
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 💻 Running the Application

```bash
# Navigate to the project directory
cd hostelcare-app

# Install dependencies
npm install

# Start development server
npm run dev
# The application will be live at http://localhost:3000/

# To build for production
npm run build
```
