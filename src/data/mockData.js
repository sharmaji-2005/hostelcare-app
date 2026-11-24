export const INITIAL_COMPLAINTS = [
  {
    id: "HC-101",
    category: "Electrical",
    title: "Ceiling fan making loud grinding noise",
    description: "The ceiling fan in room 204 makes an unbearable rattling and grinding sound whenever run at speed 3 or higher. It also has a slight wobble, making it feel unsafe to sleep underneath.",
    block: "Block B",
    room: "204",
    urgency: "High",
    status: "In Progress",
    studentName: "Aarav Sharma",
    studentRoll: "2023CSB042",
    createdAt: "2026-11-23T10:30:00Z",
    assignedTo: "Electrician - Ramesh Kumar",
    remarks: "Electrician inspected the bearing on Monday. Replacement capacitor and blade balancing scheduled for 4:00 PM today.",
    image: "https://images.unsplash.com/photo-1590756254933-2873d72a83b6?auto=format&fit=crop&w=600&q=80",
    rating: null,
    resolvedAt: null
  },
  {
    id: "HC-102",
    category: "Plumbing",
    title: "Severe washbasin pipe leakage & pooling",
    description: "The PVC drain trap under the washbasin has cracked. Every time the tap is turned on, dirty water leaks directly onto the bathroom floor, causing water stagnation and foul smell.",
    block: "Block A",
    room: "108",
    urgency: "High",
    status: "Open",
    studentName: "Priya Patel",
    studentRoll: "2023EEB019",
    createdAt: "2026-11-24T08:15:00Z",
    assignedTo: "Unassigned",
    remarks: "",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
    rating: null,
    resolvedAt: null
  },
  {
    id: "HC-103",
    category: "Wi-Fi/Internet",
    title: "Frequent packet loss & 5GHz AP drops",
    description: "Wi-Fi access point AP-B2-04 drops connection every 5-10 minutes during peak study hours (8 PM - 11 PM). Speed test drops below 0.5 Mbps and online lab tests get disrupted.",
    block: "Block B",
    room: "204",
    urgency: "Medium",
    status: "Resolved",
    studentName: "Aarav Sharma",
    studentRoll: "2023CSB042",
    createdAt: "2026-11-21T19:40:00Z",
    assignedTo: "IT Network Team - Vikas",
    remarks: "AP firmware upgraded, 5GHz DFS channel collision resolved. Signal verified at 92 Mbps with zero packet loss.",
    image: null,
    rating: 5,
    resolvedAt: "2026-11-22T14:30:00Z"
  },
  {
    id: "HC-104",
    category: "Mess/Food",
    title: "Ground floor water cooler dispensing warm water",
    description: "The RO water purifier next to the mess entrance is dispensing warm water and the filter replacement LED light has been blinking red for 3 days.",
    block: "Block C",
    room: "Mess Dining Hall",
    urgency: "Medium",
    status: "Resolved",
    studentName: "Rohan Verma",
    studentRoll: "2022MEB088",
    createdAt: "2026-11-20T12:00:00Z",
    assignedTo: "Facility Maintenance - Suresh",
    remarks: "Sediment filter and UV lamp replaced. Compressor coolant refilled. Water temperature checked at crisp 14°C.",
    image: null,
    rating: 4,
    resolvedAt: "2026-11-21T11:00:00Z"
  },
  {
    id: "HC-105",
    category: "Housekeeping",
    title: "Overflowing corridor dustbin and uncleaned window mesh",
    description: "3rd floor east wing common dustbins have not been emptied since yesterday. Also, heavy dust accumulation on the corridor mesh windows due to ongoing road work outside.",
    block: "Block B",
    room: "312",
    urgency: "Low",
    status: "Open",
    studentName: "Karan Singh",
    studentRoll: "2024CSB112",
    createdAt: "2026-11-24T07:20:00Z",
    assignedTo: "Unassigned",
    remarks: "",
    image: null,
    rating: null,
    resolvedAt: null
  },
  {
    id: "HC-106",
    category: "Security/Other",
    title: "Main turnstile biometric scanner rejection",
    description: "Turnstile gate #2 at the main hostel entrance fails fingerprint reading 4 out of 5 times, causing long queues during 9:00 AM class rush.",
    block: "Block A",
    room: "Main Gate",
    urgency: "Medium",
    status: "In Progress",
    studentName: "Sneha Nair",
    studentRoll: "2023ECB055",
    createdAt: "2026-11-23T09:10:00Z",
    assignedTo: "Chief Security Officer - Manoj",
    remarks: "Optical prism cleaned. Hardware vendor requested to re-calibrate sensitivity on firmware v3.4.",
    image: null,
    rating: null,
    resolvedAt: null
  }
];

export const INITIAL_FEEDBACK = [
  {
    id: "FB-201",
    category: "Mess Food Quality",
    rating: 4,
    comment: "The paneer butter masala and garlic naan served on Sunday dinner were top notch! However, Monday breakfast poori was overly oily. Please maintain consistent oil standards.",
    isAnonymous: false,
    studentName: "Aarav Sharma",
    room: "B-204",
    block: "Block B",
    createdAt: "2026-11-23T21:10:00Z"
  },
  {
    id: "FB-202",
    category: "Cleanliness",
    rating: 5,
    comment: "Shoutout to the housekeeping team on Block B 2nd floor! Washrooms are sanitized twice daily and smell fresh. Really appreciate their hard work.",
    isAnonymous: true,
    studentName: "Anonymous Resident",
    room: "Block B",
    block: "Block B",
    createdAt: "2026-11-22T16:45:00Z"
  },
  {
    id: "FB-203",
    category: "Wi-Fi Speed",
    rating: 2,
    comment: "Wi-Fi bandwidth severely throttled between 9 PM and midnight. Download speeds barely reach 1 Mbps in Wing A corner rooms. Need mesh repeater.",
    isAnonymous: false,
    studentName: "Karan Singh",
    room: "B-312",
    block: "Block B",
    createdAt: "2026-11-21T23:30:00Z"
  },
  {
    id: "FB-204",
    category: "Hostel Maintenance",
    rating: 4,
    comment: "Hot water geyser timer should start at 6:00 AM and run till 9:30 AM instead of shutting off strictly at 8:30 AM, especially with upcoming winter exams.",
    isAnonymous: false,
    studentName: "Priya Patel",
    room: "A-108",
    block: "Block A",
    createdAt: "2026-11-20T18:15:00Z"
  },
  {
    id: "FB-205",
    category: "Mess Food Quality",
    rating: 3,
    comment: "Need more protein options in breakfast like boiled eggs or sprouts. Evening snacks are often finished if arriving after 5:30 PM.",
    isAnonymous: true,
    studentName: "Anonymous Resident",
    room: "Block C",
    block: "Block C",
    createdAt: "2026-11-19T14:20:00Z"
  }
];

export const CURRENT_STUDENT = {
  name: "Aarav Sharma",
  rollNo: "2023CSB042",
  room: "204",
  block: "Block B",
  email: "aarav.sharma@hostel.edu",
  phone: "+91 98765 43210"
};

export const CATEGORIES = [
  "Electrical",
  "Plumbing",
  "Housekeeping",
  "Wi-Fi/Internet",
  "Mess/Food",
  "Security/Other"
];

export const FEEDBACK_CATEGORIES = [
  "Mess Food Quality",
  "Cleanliness",
  "Wi-Fi Speed",
  "Hostel Maintenance",
  "Security & Discipline"
];

export const BLOCKS = ["Block A", "Block B", "Block C", "Block D"];

export const STAFF_MEMBERS = [
  "Electrician - Ramesh Kumar",
  "Plumber - Dinesh Sharma",
  "IT Network Team - Vikas",
  "Facility Maintenance - Suresh",
  "Housekeeping Supervisor - Anita",
  "Chief Security Officer - Manoj"
];
