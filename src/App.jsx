import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Award, 
  Flame, 
  Zap, 
  BarChart2, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Download, 
  Play, 
  Pause,
  RotateCcw,
  Users, 
  Layers, 
  Shield, 
  Star, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  Activity, 
  FileText, 
  Brain,
  MessageSquare,
  Bookmark,
  Bell,
  Cpu,
  Target,
  Eye,
  Apple
} from 'lucide-react';

const WindowsIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.95 1.95L24 0v11.55H10.95V1.95zM10.95 12.45H24v11.55l-13.05-1.95v-9.6z"/>
  </svg>
);

const AndroidIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-4.18l1.3-1.3a.49.49 0 0 0 0-.7c-.2-.2-.51-.2-.7 0l-1.46 1.46C13.78 2.89 12.91 2.5 12 2.5s-1.78.39-2.67.78L7.87 1.82a.49.49 0 0 0-.7 0c-.2.2-.2.51 0 .7l1.3 1.3C6.73 5.07 5.75 7.15 5.54 9.5h12.92c-.21-2.35-1.19-4.43-2.93-5.68zM9 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const demoVideos = [
  {
    id: 'install',
    title: 'How to download and install app',
    url: 'https://www.youtube.com/embed/OHou4aGwUN0',
    duration: '3:45',
    badge: 'Getting Started',
    icon: Download,
    description: 'Learn how to easily download and install the CA Next Door application on your local device.'
  },
  {
    id: 'update',
    title: 'How to update the app',
    url: null,
    duration: 'Coming Soon',
    badge: 'App Updates',
    icon: RotateCcw,
    description: 'Learn how to keep your CA Next Door app updated to the latest version to access new features and bug fixes.'
  },
  {
    id: 'usage',
    title: 'How to use CA Next Door App',
    url: null, // coming soon
    duration: 'Coming Soon',
    badge: 'Walkthrough',
    icon: Sparkles,
    description: 'Deep dive into the operational spacing engine, active revision plans, and error register analytics.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [revisionTopic, setRevisionTopic] = useState('Financial Reporting - Consolidation');
  const [scheduledRevisions, setScheduledRevisions] = useState([]);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedDemoVideoId, setSelectedDemoVideoId] = useState('install');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [revisionVisualMode, setRevisionVisualMode] = useState('screenshot');
  const [mistakeVisualMode, setMistakeVisualMode] = useState('heatmap');
  const [showResourcesToast, setShowResourcesToast] = useState(false);

  // Mock Test Arena States
  const [testStage, setTestStage] = useState('reading'); // 'reading' | 'active' | 'eval' | 'summary'
  const [testActiveQuestion, setTestActiveQuestion] = useState('CS-1'); // 'CS-1' | 'q1'
  const [optionalQuestions, setOptionalQuestions] = useState([]); // list of optional questions marked
  const [testIsPaused, setTestIsPaused] = useState(false);

  // Timers
  const [readingTimer, setReadingTimer] = useState(891); // 14 mins 51 secs (14*60 + 51 = 891)
  const [activeTotalTimer, setActiveTotalTimer] = useState(10789); // 2 hrs 59 mins 49 secs (2*3600 + 59*60 + 49 = 10789)
  const [activeQuestionTimer, setActiveQuestionTimer] = useState(11); // starts at 11s

  // Times logged per question (actual times spent, in seconds)
  const [timeSpentCS1, setTimeSpentCS1] = useState(25);
  const [timeSpentQ1, setTimeSpentQ1] = useState(0);

  // Marks scored for evaluation
  const [scoreCS1, setScoreCS1] = useState('0.0');
  const [scoreQ1, setScoreQ1] = useState('0.0');

  // Timer effect
  useEffect(() => {
    if (testIsPaused) return;

    const interval = setInterval(() => {
      if (testStage === 'reading') {
        setReadingTimer(prev => (prev > 0 ? prev - 1 : 0));
      } else if (testStage === 'active') {
        setActiveTotalTimer(prev => (prev > 0 ? prev - 1 : 0));
        
        // Update timers cleanly without causing side-effects inside state updaters
        setActiveQuestionTimer(prev => prev + 1);
        if (testActiveQuestion === 'CS-1') {
          setTimeSpentCS1(prev => prev + 1);
        } else {
          setTimeSpentQ1(prev => prev + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [testStage, testActiveQuestion, testIsPaused]);

  const triggerResourcesToast = () => {
    setShowResourcesToast(true);
    setTimeout(() => {
      setShowResourcesToast(false);
    }, 4000);
  };

  // Time remaining to CA Exams
  const [timeLeft, setTimeLeft] = useState({ days: 120, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Revision auto scheduler
  const handleScheduleRevision = (e) => {
    e.preventDefault();
    if (!revisionTopic.trim()) return;

    const today = new Date();
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const newSchedule = {
      id: Date.now(),
      topic: revisionTopic,
      rev1: addDays(today, 1),
      rev2: addDays(today, 7),
      rev3: addDays(today, 21),
    };

    setScheduledRevisions([newSchedule, ...scheduledRevisions.slice(0, 2)]);
    setRevisionTopic('');
  };

  // Prepopulate one revision
  useEffect(() => {
    const today = new Date();
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    setScheduledRevisions([
      {
        id: 1,
        topic: 'FR - Ind AS 115 (Revenue)',
        rev1: addDays(today, 1),
        rev2: addDays(today, 7),
        rev3: addDays(today, 21)
      }
    ]);
  }, []);

  const featuresList = [
    {
      id: 'dashboard',
      title: 'Smart Dashboard',
      desc: 'All study metrics, revision queues, and daily target completions visualized in a beautiful, distraction-free command center.',
      icon: Layers,
      color: 'from-indigo-500 to-violet-500',
      badge: 'Core UI',
      preview: (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-slate-500 font-medium">Daily Study Target</span>
            <span className="text-indigo-600 font-bold">6.2 / 8 hrs</span>
          </div>
          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-slate-500 font-medium">Current Streak</span>
            <span className="text-orange-600 font-extrabold flex items-center gap-1">24 Days <Flame size={12} className="fill-orange-600" /></span>
          </div>
        </div>
      )
    },
    {
      id: 'syllabus',
      title: 'Syllabus Tracker',
      desc: 'Granular tracking down to chapter and concepts for FR, AFM, Audit, DT, and IDT with progress metrics built for CA Aspirant syllabus weightage.',
      icon: BookOpen,
      color: 'from-sky-500 to-indigo-500',
      badge: 'Comprehensive',
      preview: (
        <div className="space-y-2 text-xs">
          <div className="w-full bg-white h-4 rounded-full overflow-hidden border border-black p-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '72%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-bold">
            <span>Syllabus Completion</span>
            <span className="text-slate-900 font-black">72% Completed</span>
          </div>
        </div>
      )
    },
    {
      id: 'revision',
      title: 'Advanced Revision Engine',
      desc: 'Systematic review scheduling. Automatically calculates and triggers first, second, and third revision rounds timed perfectly before your exam date.',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      badge: 'Revision Scheduling',
      preview: (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center bg-white p-1.5 px-2 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-slate-800 font-bold text-[10px]">FR Consolidation</span>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded text-[8px] font-black">Rev 1: Today</span>
          </div>
          <div className="flex justify-between items-center bg-white p-1.5 px-2 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-slate-400 text-[10px]">AFM Portfolio</span>
            <span className="bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded text-[8px] font-black">Rev 2: In 3 Days</span>
          </div>
        </div>
      )
    },
    {
      id: 'planner',
      title: 'Dynamic Task Planner',
      desc: 'Block study slots, manage backlogs, and plan daily checklists. Automatically adjusts schedules when you skip a target to avoid overwhelm.',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Dynamic',
      preview: (
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <input type="checkbox" defaultChecked className="rounded border border-black text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" />
            <span className="line-through text-slate-400 text-[10px] font-semibold">Ind AS 103 Practice Qs</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800">
            <input type="checkbox" className="rounded border border-black text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">Audit Standards Review</span>
          </div>
        </div>
      )
    },
    {
      id: 'milestones',
      title: 'Goals & Milestones',
      desc: 'Establish clear milestone goals like completing 1st reading, solving past year papers (RTPs/MTPs), and tracking test schedules.',
      icon: Target,
      color: 'from-orange-500 to-amber-500',
      badge: 'Goal-Oriented',
      preview: (
        <div className="space-y-1.5 text-xs text-[9px]">
          <div className="flex justify-between items-center bg-white px-2 py-1 border border-black rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-slate-800 font-bold">Solve May 2025 Past Paper</span>
            <span className="text-amber-700 font-extrabold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">Pending</span>
          </div>
          <div className="flex justify-between items-center bg-white px-2 py-1 border border-black rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-slate-800 font-bold">SA 500 Standards Series</span>
            <span className="text-emerald-700 font-extrabold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">Passed</span>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Test Analytics',
      desc: 'Log mockup and test scores. Analyze strengths and weak subject chapters, identifying areas requiring immediate secondary reading.',
      icon: BarChart2,
      color: 'from-rose-500 to-red-500',
      badge: 'Deep Analytics',
      preview: (
        <div className="flex items-end gap-2.5 h-10 pt-2 justify-center bg-white border border-black rounded-xl p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-3 bg-indigo-200 h-5 rounded-t border border-black" />
          <div className="w-3 bg-indigo-300 h-8 rounded-t border border-black" />
          <div className="w-3 bg-indigo-400 h-6 rounded-t border border-black" />
          <div className="w-3 bg-indigo-600 h-10 rounded-t border border-black" />
        </div>
      )
    },
    {
      id: 'vault',
      title: 'Material Vault',
      desc: 'Keep all standard study resources, ICAI publications, RTPs, MTPs, and question banks structured in one hyper-linked database.',
      icon: Bookmark,
      color: 'from-indigo-500 to-violet-500',
      badge: 'Organization',
      preview: (
        <div className="grid grid-cols-2 gap-1.5 text-[9px] text-slate-800">
          <div className="bg-white p-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-center font-bold">ICAI SM 2026</div>
          <div className="bg-white p-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-center font-bold">RTP May 2026</div>
        </div>
      )
    },
    {
      id: 'notes',
      title: 'Notes & LDR Manager',
      desc: 'Organize your Last Day Revision (LDR) summaries, essential formulas, and core section codes to quickly review on exam eve.',
      icon: FileText,
      color: 'from-amber-500 to-yellow-500',
      badge: 'Exam Eve Focus',
      preview: (
        <div className="space-y-1 text-[10px] text-slate-800">
          <div className="bg-amber-50 border border-black p-1.5 rounded-lg text-amber-900 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ⚠️ Ind AS 110: Consolidation steps
          </div>
        </div>
      )
    },
    {
      id: 'streaks',
      title: 'Study Streaks',
      desc: 'Build continuous discipline. Watch your streak count grow day by day, protecting it from breaking with study buddy check-ins.',
      icon: Flame,
      color: 'from-orange-500 to-rose-500',
      badge: 'Gamification',
      preview: (
        <div className="flex justify-center items-center gap-2 bg-white border border-black rounded-xl py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-orange-50 p-1 rounded-full border border-orange-200 text-orange-600">
            <Flame size={12} className="fill-orange-500" />
          </div>
          <span className="text-xs font-black text-slate-800">24 Days</span>
        </div>
      )
    },
    {
      id: 'resources',
      title: 'Resource Manager',
      desc: 'Manage study trackers, planner widgets, and class logs in one unified resource list to completely isolate and eliminate planning overhead.',
      icon: Cpu,
      color: 'from-sky-500 to-indigo-500',
      badge: 'Systematic',
      preview: (
        <div className="flex gap-1.5 text-[9px] text-slate-700 justify-center">
          <span className="bg-white border border-black px-1.5 py-0.5 rounded-lg font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">Classes: 100%</span>
          <span className="bg-white border border-black px-1.5 py-0.5 rounded-lg font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">Planner: Active</span>
        </div>
      )
    }
  ];

  const workflowSteps = [
    {
      title: 'Plan Syllabus',
      desc: 'Map the complete syllabus of FR, AFM, Audit, DT, and IDT, establishing modular milestones and completion dates based on historical paper weightage.',
      tag: 'Step 1',
      bullets: [
        'Select target exam attempt (May/Nov)',
        'Weightage-based planning logic',
        'Auto-assigned chapter deadlines'
      ]
    },
    {
      title: 'Study Daily targets',
      desc: 'Execute structured daily study blocks using our highly focused smart planner widgets. Log study hours and task checklist completions without friction.',
      tag: 'Step 2',
      bullets: [
        'One-click task status updates',
        'Deep Work countdown timer',
        'Distraction-free checklist view'
      ]
    },
    {
      title: 'Systematic Review Cycles',
      desc: 'Let our algorithm auto-schedule your 1st, 2nd, and 3rd revision slots, making sure you hit every core standard and code repeatedly before the exam.',
      tag: 'Step 3',
      bullets: [
        '3-tier revision scheduler',
        'Spaced repetition algorithms',
        'Flagged review checklist items'
      ]
    },
    {
      title: 'Take Mock Tests',
      desc: 'Conduct simulated tests under actual ICAI conditions. Log your scores in our database to analyze consistency and pinpoint specific weak chapters.',
      tag: 'Step 4',
      bullets: [
        'Simulated timed test sessions',
        'Section-by-section scoring logs',
        'Detailed performance analytics'
      ]
    },
    {
      title: 'Track Performance & Analytics',
      desc: 'Observe historical score trendlines, subject-wise readiness indicators, and average weekly study hours in gorgeous startup-style graphs.',
      tag: 'Step 5',
      bullets: [
        'Subject-by-subject readiness levels',
        'Weekly study target statistics',
        'Streak tracking and log records'
      ]
    },
    {
      title: 'Iterate & Secure Rank',
      desc: 'Address specific study gaps, revise highlighted weak topics, protect your study streaks, and walk into the examination hall with total confidence.',
      tag: 'Step 6',
      bullets: [
        'Personalized gap analysis',
        'Focused weak-topic reviews',
        'High-confidence exam-prep dashboard'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Chitransh',
      role: 'CA Student',
      color: 'bg-indigo-600 text-white',
      stat: '92% Revision Consistency',
      text: 'I used to spend every Sunday updating my study planner Excel sheet, only for it to break by Wednesday because of articleship work or long lectures. This app actually adjusts when I miss a target. It takes the anxiety out of backlogs and shows me exactly where I stand with my first and second revision rounds.',
      metric: '+45h Logged Study'
    },
    {
      name: 'Yashashvi',
      role: 'CA Student',
      color: 'bg-rose-500 text-white',
      stat: 'Reduced Backlog by 78%',
      text: 'Balancing articleship with CA prep is brutal. I was always drowning in backlogs and feeling guilty. Here, if I miss a 4-hour DT lecture due to client audits, it doesn\'t ruin my week. The system just spreads out the pending topics across my next few study blocks. It feels like someone is actually managing the mess for me.',
      metric: '720h Total Study Tracked'
    },
    {
      name: 'Maanvi',
      role: 'CA Student',
      color: 'bg-amber-400 text-slate-900',
      stat: '+32% Mock Test Growth',
      text: 'I was scoring 45-50 in my FR mock tests and couldn\'t figure out why. The weak chapter insights pointed out that I was consistently messing up Consolidation and Business Combinations. I stopped re-reading the chapters I was already good at and spent three days drilling down on those weak areas. My next mock score jumped to 68.',
      metric: '92% Accuracy Focus'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-slate-600 overflow-x-hidden font-sans relative">
      
      {/* BACKGROUND ORBS & PATTERNS */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60" />
      
      {/* Animated Minimalist Drifting Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/5 blur-[120px] animate-drift-1" />
        <div className="absolute top-[35%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-sky-300/5 blur-[120px] animate-drift-2" />
        <div className="absolute bottom-[10%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-violet-400/5 blur-[130px] animate-drift-3" />
      </div>

      {/* Subtle Drifting Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] left-[10%] opacity-20 animate-drift-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
        <div className="absolute top-[45%] right-[15%] opacity-25 animate-drift-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-400">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <div className="absolute top-[75%] left-[8%] opacity-15 animate-drift-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-400">
            <path d="M12 3L2 22h20L12 3z" />
          </svg>
        </div>
      </div>

      {/* Dynamic Animated Flowing Waves & Repeating Wave Lines distributed down the whole page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Wave Group 1: Near Top (Hero & Stats) */}
        <div className="absolute top-[180px] left-0 h-[220px] w-[5760px] opacity-20 animate-wave-fast">
          <svg className="w-full h-full text-indigo-500" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,30 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 6" />
          </svg>
        </div>
        <div className="absolute top-[260px] left-0 h-[220px] w-[5760px] opacity-15 animate-wave-medium" style={{ animationDirection: 'reverse' }}>
          <svg className="w-full h-full text-sky-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,170 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute top-[120px] left-0 h-[220px] w-[5760px] opacity-[0.12] animate-wave-slow">
          <svg className="w-full h-full text-violet-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,130 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Wave Group 2: Mid-Upper (Features Section, around 1500px) */}
        <div className="absolute top-[1500px] left-0 h-[220px] w-[5760px] opacity-12 animate-wave-fast" style={{ animationDirection: 'reverse' }}>
          <svg className="w-full h-full text-indigo-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,60 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="2" strokeDasharray="12 8" />
          </svg>
        </div>
        <div className="absolute top-[1620px] left-0 h-[220px] w-[5760px] opacity-10 animate-wave-medium">
          <svg className="w-full h-full text-violet-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,140 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Wave Group 3: Mid-Lower (Revision & Mistake Book, around 3200px) */}
        <div className="absolute top-[3100px] left-0 h-[220px] w-[5760px] opacity-15 animate-wave-fast">
          <svg className="w-full h-full text-indigo-500" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,40 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          </svg>
        </div>
        <div className="absolute top-[3200px] left-0 h-[220px] w-[5760px] opacity-12 animate-wave-medium" style={{ animationDirection: 'reverse' }}>
          <svg className="w-full h-full text-sky-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,160 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Wave Group 4: Lower-Middle (Workflow & Testimonials, around 4700px) */}
        <div className="absolute top-[4700px] left-0 h-[220px] w-[5760px] opacity-12 animate-wave-fast" style={{ animationDirection: 'reverse' }}>
          <svg className="w-full h-full text-indigo-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,50 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="2.2" strokeDasharray="10 6" />
          </svg>
        </div>
        <div className="absolute top-[4800px] left-0 h-[220px] w-[5760px] opacity-10 animate-wave-slow">
          <svg className="w-full h-full text-violet-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,120 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Wave Group 5: Near Bottom (Pricing & Footer, around 5900px) */}
        <div className="absolute top-[5900px] left-0 h-[220px] w-[5760px] opacity-15 animate-wave-fast">
          <svg className="w-full h-full text-indigo-500" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,30 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 6" />
          </svg>
        </div>
        <div className="absolute top-[6000px] left-0 h-[220px] w-[5760px] opacity-12 animate-wave-medium" style={{ animationDirection: 'reverse' }}>
          <svg className="w-full h-full text-sky-400" viewBox="0 0 2880 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,100 Q180,170 360,100 T720,100 T1080,100 T1440,100 T1800,100 T2160,100 T2520,100 T2880,100" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-black px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="CA Next Door Logo" 
              className="w-9 h-9 object-contain"
            />
            <span className="font-extrabold text-xl tracking-tight text-white">
              CA Next Door
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-extrabold">
            <a href="#features" className="text-slate-300 hover:text-indigo-400 transition-colors">Features</a>
            <a href="#revision" className="text-slate-300 hover:text-indigo-400 transition-colors">Revision Engine</a>
            <a href="#tests" className="text-slate-300 hover:text-indigo-400 transition-colors">Mock Tests</a>
            <a href="#workflow" className="text-slate-300 hover:text-indigo-400 transition-colors">Workflow</a>
            <a href="#why" className="text-slate-300 hover:text-indigo-400 transition-colors">Testimonials</a>
            <button 
              onClick={triggerResourcesToast}
              className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5 focus:outline-none"
            >
              <span>Resources</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 scale-90 tracking-wider">
                Soon
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setShowDemoModal(true)}
              className="px-5 py-2.5 text-sm font-extrabold bg-slate-800 border border-black text-slate-200 hover:bg-slate-700/60 hover:text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              Watch Demo
            </button>
            <div className="relative group/download">
              <button 
                className="px-5 py-2.5 text-sm font-extrabold bg-indigo-600 border border-black text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-2"
              >
                <Download size={15} /> Download App <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hidden group-hover/download:block hover:block z-50 overflow-hidden text-white font-extrabold text-xs">
                <a 
                  href="https://drive.google.com/drive/folders/19pTyND5nk5zRfYvgpYzeFcg_5i9ZAIT1?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800"
                >
                  <WindowsIcon className="w-4 h-4 text-indigo-400" />
                  <span>Download for Windows</span>
                </a>
                <a 
                  href="https://drive.google.com/drive/folders/1_fGny8pmpkHU6SWmnnNXwpKM-nJoF1Gt?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex gap-1 text-indigo-400">
                    <AndroidIcon className="w-4 h-4" />
                    <Apple className="w-4 h-4 fill-current" />
                  </div>
                  <span>Download for Mobile/Tablet</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-slate-950 border border-black rounded-2xl overflow-hidden px-5 py-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.12)] text-white"
            >
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 font-extrabold py-2 border-b border-slate-800"
              >
                Features
              </a>
              <a 
                href="#revision" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 font-extrabold py-2 border-b border-slate-800"
              >
                Revision Engine
              </a>
              <a 
                href="#tests" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 font-extrabold py-2 border-b border-slate-800"
              >
                Mock Tests
              </a>
              <a 
                href="#workflow" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 font-extrabold py-2 border-b border-slate-800"
              >
                Workflow
              </a>
              <a 
                href="#why" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 font-extrabold py-2 border-b border-slate-800"
              >
                Testimonials
              </a>
              <button 
                onClick={() => { setMobileMenuOpen(false); triggerResourcesToast(); }}
                className="w-full text-left text-slate-300 hover:text-indigo-400 font-extrabold py-2 flex items-center justify-between focus:outline-none"
              >
                <span>Resources</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wider scale-90">
                  Soon
                </span>
              </button>
              
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setShowDemoModal(true); }}
                  className="w-full py-2.5 text-center font-extrabold bg-slate-800 border border-black text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  Watch Demo
                </button>
                <a 
                  href="https://drive.google.com/drive/folders/19pTyND5nk5zRfYvgpYzeFcg_5i9ZAIT1?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-extrabold bg-indigo-600 border border-black text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2"
                >
                  <WindowsIcon className="w-4 h-4" /> Download for Windows
                </a>
                <a 
                  href="https://drive.google.com/drive/folders/1_fGny8pmpkHU6SWmnnNXwpKM-nJoF1Gt?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-extrabold bg-indigo-600 border border-black text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2"
                >
                  <div className="flex gap-1 items-center">
                    <AndroidIcon className="w-4 h-4" />
                    <Apple className="w-4 h-4 fill-current" />
                  </div>
                  Download for Mobile/Tablet
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-black rounded-full px-4 py-1.5 text-xs text-indigo-850 font-bold mx-auto lg:mx-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles size={12} className="fill-indigo-850 text-indigo-850 animate-pulse" /> Premium Syllabus Retention System for CA Aspirants
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Prepare Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                Revise Better.
              </span> <br />
              Track Everything.
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              The complete preparation system built exclusively for CA candidates. Systematically structure study target execution, track syllabus completions, and trigger automated review cycles for long-term memory recall.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="https://drive.google.com/drive/folders/19pTyND5nk5zRfYvgpYzeFcg_5i9ZAIT1?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
              >
                <WindowsIcon className="w-5 h-5" /> Download for Windows
              </a>
              <a 
                href="https://drive.google.com/drive/folders/1_fGny8pmpkHU6SWmnnNXwpKM-nJoF1Gt?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
              >
                <div className="flex gap-1 items-center">
                  <AndroidIcon className="w-5 h-5" />
                  <Apple className="w-5 h-5 fill-current" />
                </div>
                Download for Mobile/Tablet
              </a>
              <button 
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-4 bg-white border border-black text-slate-955 hover:bg-slate-50 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Play size={16} className="fill-slate-955 text-slate-955" /> Watch Demo
              </button>
            </div>


          </div>

          {/* Right Visual Column (Premium App Screenshot/Visual Placeholder) */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/30 to-sky-100/30 rounded-[32px] blur-2xl -z-10" />
            
            {/* Elegant glassmorphic placeholder container with Real App Screenshot */}
            <div className="w-full bg-white rounded-3xl border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-0 relative group transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Window Header */}
              <div className="bg-slate-50 px-4 py-3 border-b-2 border-black flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">ca-next-door.app/dashboard</span>
                <span className="w-10" />
              </div>

              {/* Real Dashboard Image */}
              <div className="relative overflow-hidden bg-slate-100">
                <img 
                  src="/dashboard-preview.png" 
                  alt="CA Next Door Real App Dashboard" 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6 z-10 relative">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1 text-xs text-indigo-700 font-semibold uppercase tracking-wider">
              Comprehensive Platform
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything You Need to Stay on Track
            </h2>
            <p className="text-lg text-slate-500">
              Stop juggling generic checklists, spreadsheets, and calendar reminders. CA Next Door acts as your unified operational system.
            </p>
          </div>

          {/* Grid of 10 Visual Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.id}
                  className="bg-white rounded-2xl border border-black p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-slate-50 text-slate-900 border border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Icon size={18} />
                      </div>
                      <span className="text-[9px] uppercase font-mono bg-black text-white px-2.5 py-0.5 rounded-md border border-black font-extrabold tracking-wider">
                        {feat.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-slate-900 leading-snug">{feat.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>

                  {/* UI Preview Area */}
                  <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-black">
                    {feat.preview}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ADVANCED REVISION ENGINE SECTION */}
      <section id="revision" className="py-24 bg-slate-50/50 border-t border-b border-slate-200/60 z-10 px-6 relative overflow-hidden">
        
        {/* Glow Blob */}
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-[0.03] bg-indigo-500 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Timeline Visual & Engine Mock */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            
            {/* Visual View Toggler */}
            <div className="flex gap-3 justify-start mb-6">
              <button 
                onClick={() => setRevisionVisualMode('screenshot')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border border-black transition-all flex items-center gap-2 ${revisionVisualMode === 'screenshot' ? 'bg-indigo-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]' : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'}`}
              >
                <Eye size={14} /> Planner Interface
              </button>
              <button 
                onClick={() => setRevisionVisualMode('timeline')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border border-black transition-all flex items-center gap-2 ${revisionVisualMode === 'timeline' ? 'bg-indigo-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]' : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'}`}
              >
                <Clock size={14} /> Spacing Logic
              </button>
            </div>

            {revisionVisualMode === 'screenshot' ? (
              /* Real Revision Planner Screenshot Container */
              <div className="w-full bg-white rounded-3xl border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-0 relative group transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Window Header */}
                <div className="bg-slate-50 px-4 py-3 border-b-2 border-black flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">ca-next-door.app/revision-planner</span>
                  <span className="w-10" />
                </div>

                {/* Real Screenshot */}
                <div className="relative overflow-hidden bg-slate-100">
                  <img 
                    src="/revision-preview.png" 
                    alt="CA Next Door Real App Revision Planner" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            ) : (
              /* Spacing Logic Timeline (Day 0 - Day 21) */
              <div className="bg-white border border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
                
                {/* Spaced rep schedule visualization */}
                <div className="space-y-6 md:space-y-8 relative">
                  
                  {/* Connecting line */}
                  <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-500 via-sky-400 to-purple-500 pointer-events-none opacity-30" />

                  {/* Day 0 */}
                  <div className="flex gap-6 relative z-10 group/item">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-extrabold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm group-hover/item:scale-105 transition-all duration-300 select-none">
                      Day 0
                    </div>
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-black flex-grow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover/item:translate-x-[-1px] group-hover/item:translate-y-[-1px] group-hover/item:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                      <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wider">Initial Study block</h4>
                      <p className="text-xs md:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">Read chapter, solve exercise questions, highlight essential LDR notes.</p>
                      <div className="flex gap-2 mt-3.5">
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">FR Ind AS 115</span>
                        <span className="bg-white text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">Duration: 4.5h</span>
                      </div>
                    </div>
                  </div>

                  {/* Day 1 */}
                  <div className="flex gap-6 relative z-10 group/item">
                    <div className="w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 font-extrabold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm group-hover/item:scale-105 transition-all duration-300 select-none">
                      Day 1
                    </div>
                    <div className="bg-sky-50 p-5 md:p-6 rounded-2xl border border-black flex-grow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover/item:translate-x-[-1px] group-hover/item:translate-y-[-1px] group-hover/item:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          🔄 Revision Round 1 <span className="bg-sky-100 text-sky-800 text-[9px] font-mono px-2 py-0.5 rounded font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">Spaced</span>
                        </h4>
                        <span className="text-[9px] text-amber-800 flex items-center gap-1 font-black bg-amber-100 px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0">⚠️ OVERDUE</span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed font-medium">Quick review of marked formulas and standard concepts. Takes ~45 mins.</p>
                    </div>
                  </div>

                  {/* Day 7 */}
                  <div className="flex gap-6 relative z-10 group/item">
                    <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 font-extrabold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm group-hover/item:scale-105 transition-all duration-300 select-none">
                      Day 7
                    </div>
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-black flex-grow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover/item:translate-x-[-1px] group-hover/item:translate-y-[-1px] group-hover/item:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                      <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wider">🔄 Revision Round 2</h4>
                      <p className="text-xs md:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">Solve mock chapter tests. Identify and address lingering understanding gaps.</p>
                    </div>
                  </div>

                  {/* Day 21 */}
                  <div className="flex gap-6 relative z-10 group/item">
                    <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 font-extrabold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm group-hover/item:scale-105 transition-all duration-300 select-none">
                      Day 21
                    </div>
                    <div className="bg-slate-100 p-5 md:p-6 rounded-2xl border border-black flex-grow opacity-70 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                      <h4 className="text-xs md:text-sm font-black text-slate-500 uppercase tracking-wider">🔄 Final Revision Round 3</h4>
                      <p className="text-xs md:text-sm text-slate-400 mt-1.5 leading-relaxed font-medium">Final brush-up prior to actual final exam. Confirm retention with visual recall widgets.</p>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* Explanation Text */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 text-xs text-purple-700 font-semibold uppercase tracking-wider">
              Syllabus Retention Engine
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Standout Engine Built For Retention
            </h2>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
              Reviewing concepts at optimized intervals has been proven to increase long-term visual retention by up to <strong className="text-indigo-600">85%</strong>. CA Next Door maps this review timeline automatically for every single standard and chapter, keeping your prep seamless.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <span className="p-1 bg-emerald-100 text-emerald-700 rounded border border-black"><Check size={12} /></span>
                  Overdue alerts
                </div>
                <p className="text-xs text-slate-500 font-medium">Flags pending revision rounds that require immediate slot allocation.</p>
              </div>

              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <span className="p-1 bg-emerald-100 text-emerald-700 rounded border border-black"><Check size={12} /></span>
                  Smart scheduling
                </div>
                <p className="text-xs text-slate-500 font-medium">Recalculates spacing cycles based on exam date proximity.</p>
              </div>

              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <span className="p-1 bg-emerald-100 text-emerald-700 rounded border border-black"><Check size={12} /></span>
                  Weak chapter detection
                </div>
                <p className="text-xs text-slate-500 font-medium">Leverages test results to prioritize weak standards in your revision cycle.</p>
              </div>

              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <span className="p-1 bg-emerald-100 text-emerald-700 rounded border border-black"><Check size={12} /></span>
                  Daily Revision slots
                </div>
                <p className="text-xs text-slate-500 font-medium">Provides a simple 30-minute daily queue containing elements scheduled for that day.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4.5 MISTAKE BOOK SECTION */}
      <section id="mistakes" className="py-24 max-w-7xl mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Explanation Text */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 rounded-full px-4 py-1.5 text-xs text-rose-750 font-semibold uppercase tracking-wider">
              Error Density Matrix
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Stop Repeating the Same Exam Mistakes
            </h2>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
              Study logs show that over <strong className="text-rose-600">70% of marks</strong> are lost by repeating familiar error types. The integrated **Mistake Book** categorizes your slip-ups so you can actively eliminate them before exam day.
            </p>

            {/* Feature Checkmarks list */}
            <div className="space-y-3 pt-2">
              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-3 items-start">
                <span className="p-1 bg-rose-100 text-rose-700 rounded border border-black shrink-0"><Check size={12} /></span>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Error Heatmap Matrix</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Visualize your error frequencies (Conceptual, Silly, Misread, Time) by chapter.</p>
                </div>
              </div>

              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-3 items-start">
                <span className="p-1 bg-rose-100 text-rose-700 rounded border border-black shrink-0"><Check size={12} /></span>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Voice Capture logs</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Too tired to type out questions? Tap the microphone to record your mistake instantly.</p>
                </div>
              </div>

              <div className="bg-white border border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-3 items-start">
                <span className="p-1 bg-rose-100 text-rose-700 rounded border border-black shrink-0"><Check size={12} /></span>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Severity-Based Register</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Track resolved vs unresolved errors, prioritizing critical conceptual gaps.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="lg:col-span-7 space-y-6">
            {/* Toggles */}
            <div className="flex flex-wrap gap-3 justify-start lg:justify-end mb-6">
              <button 
                onClick={() => setMistakeVisualMode('heatmap')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border border-black transition-all flex items-center gap-2 ${mistakeVisualMode === 'heatmap' ? 'bg-rose-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]' : 'bg-white text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'}`}
              >
                <Activity size={14} /> Error Density Heatmap
              </button>
              <button 
                onClick={() => setMistakeVisualMode('register')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border border-black transition-all flex items-center gap-2 ${mistakeVisualMode === 'register' ? 'bg-rose-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]' : 'bg-white text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'}`}
              >
                <FileText size={14} /> Error Register
              </button>
              <button 
                onClick={() => setMistakeVisualMode('voice')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border border-black transition-all flex items-center gap-2 ${mistakeVisualMode === 'voice' ? 'bg-rose-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]' : 'bg-white text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'}`}
              >
                <Brain size={14} /> Voice Log Form
              </button>
            </div>

            {/* Screen Window frame */}
            <div className="w-full bg-white rounded-3xl border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-0 relative group transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Window Header */}
              <div className="bg-slate-50 px-4 py-3 border-b-2 border-black flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {mistakeVisualMode === 'heatmap' && 'ca-next-door.app/mistake-matrix'}
                  {mistakeVisualMode === 'register' && 'ca-next-door.app/mistake-records'}
                  {mistakeVisualMode === 'voice' && 'ca-next-door.app/log-mistake'}
                </span>
                <span className="w-10" />
              </div>

              {/* Screenshot rendering */}
              <div className="relative overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  {mistakeVisualMode === 'heatmap' && (
                    <motion.img 
                      key="heatmap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src="/mistake-matrix.png" 
                      alt="Mistake Matrix Heatmap screenshot" 
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {mistakeVisualMode === 'register' && (
                    <motion.img 
                      key="register"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src="/mistake-register.png" 
                      alt="Error Register table screenshot" 
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {mistakeVisualMode === 'voice' && (
                    <motion.img 
                      key="voice"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src="/mistake-log.png" 
                      alt="Log Mistake form with Voice capture screenshot" 
                      className="w-full h-auto object-cover"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4.75 TIMED MOCK TESTS & SPEED ANALYTICS */}
      <section id="tests" className="py-24 bg-slate-50/50 border-t border-b border-slate-200/60 z-10 px-6 relative overflow-hidden">
        
        {/* Glow Blob */}
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-[0.03] bg-indigo-500 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-indigo-55/60 border border-indigo-100 rounded-full px-4 py-1.5 text-xs text-indigo-700 font-semibold uppercase tracking-wider" style={{ backgroundColor: 'rgba(238, 242, 255, 0.6)' }}>
              ICAI Timed Exam Arena
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Mock Test Arena & Speed Analytics
            </h2>
            <p className="text-lg text-slate-500">
              Practice under real ICAI exam pressure. Track question-level pacing, evaluate answers honestly, and inspect detailed speed variance reports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side: Explanations and interactive steps selection */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">Track Pacing to Pass CA Exams</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  CA exams are notorious for being lengthy. Solving papers requires strict adherence to the <strong className="text-indigo-600">1.8 minutes per mark</strong> thumb rule. Our Mock Test interface helps you monitor and optimize this in real time.
                </p>
              </div>

              {/* Step Tab Buttons */}
              <div className="flex flex-col gap-3">
                {[
                  { id: 'reading', label: '1. Reading Mode Active', desc: 'Simulates the mandatory 15-minute analysis window before answering.' },
                  { id: 'active', label: '2. Question Timer & PDF Reader', desc: 'Tracks actual time spent per question vs standard allotted time.' },
                  { id: 'eval', label: '3. Self-Evaluation Matrix', desc: 'Compare against suggested answers and allocate marks.' },
                  { id: 'summary', label: '4. Performance & Speed Report', desc: 'Get writing speed (marks/min), time variance, and AI insights.' }
                ].map((tab) => {
                  const isActive = testStage === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setTestStage(tab.id);
                        if (tab.id === 'active') {
                          setActiveQuestionTimer(testActiveQuestion === 'CS-1' ? timeSpentCS1 : timeSpentQ1);
                        }
                      }}
                      className={`w-full text-left p-4 rounded-2xl border border-black transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                          : 'bg-white hover:bg-slate-50 text-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                      }`}
                    >
                      <h4 className="text-xs md:text-sm font-black uppercase tracking-wider">{tab.label}</h4>
                      <p className={`text-[11px] mt-1 font-medium leading-relaxed ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {tab.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Extra Stats card */}
              <div className="bg-white border border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-lg border border-black">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Pacing Alert</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">ICAI Golden Rule: 1.8 mins/mark</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-black">
                    <span className="text-[10px] text-slate-400 font-bold block">Standard Time</span>
                    <span className="font-extrabold text-slate-800">19.8 Minutes</span>
                  </div>
                  <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-200 text-indigo-700">
                    <span className="text-[10px] text-indigo-400 font-bold block">Actual Taken</span>
                    <span className="font-extrabold">
                      {Math.floor((timeSpentCS1 + timeSpentQ1) / 60)}m {(timeSpentCS1 + timeSpentQ1) % 60}s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: The Live Test Application Simulator Panel */}
            <div className="lg:col-span-8">
              <div className="w-full bg-slate-900 rounded-3xl border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-0 relative group transition-all duration-300">
                {/* Mock App Window Header Bar */}
                <div className="bg-slate-950 px-4 py-3 border-b-2 border-black flex items-center justify-between">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-450" style={{ backgroundColor: '#f87171' }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-450" style={{ backgroundColor: '#fbbf24' }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-450" style={{ backgroundColor: '#34d399' }} />
                    <span className="ml-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      CA Next Door Test Console
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-300 font-mono">
                      {testStage === 'reading' && 'READING_MODE'}
                      {testStage === 'active' && 'EXAM_IN_PROGRESS'}
                      {testStage === 'eval' && 'SELF_EVALUATION'}
                      {testStage === 'summary' && 'PERFORMANCE_SUMMARY'}
                    </span>
                  </div>
                </div>

                {/* Sub-Header context bar showing stage name */}
                {testStage === 'reading' && (
                  <div className="bg-indigo-950 text-indigo-200 border-b border-black py-2.5 px-6 flex justify-between items-center text-xs">
                    <span className="font-extrabold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" /> Reading Mode Active (Mark Optional Questions now)
                    </span>
                    <button
                      onClick={() => {
                        setTestStage('active');
                        setActiveQuestionTimer(timeSpentCS1);
                      }}
                      className="bg-indigo-650 hover:bg-indigo-500 text-white font-extrabold px-3 py-1 rounded border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-[10px]"
                      style={{ backgroundColor: '#4f46e5' }}
                    >
                      Start Answering Now →
                    </button>
                  </div>
                )}

                {/* Live App Screen Rendering Area */}
                <div className="bg-slate-50 p-4 md:p-6 min-h-[420px] flex flex-col justify-between" style={{ backgroundColor: '#f1f5f9' }}>
                  <AnimatePresence mode="wait">
                    
                    {/* STAGE 1: Reading Mode Active */}
                    {testStage === 'reading' && (
                      <motion.div
                        key="stage-reading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 w-full"
                      >
                        {/* Timer Header Banner */}
                        <div className="flex flex-col md:flex-row justify-between items-center bg-indigo-950 text-white p-4 rounded-2xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-xl bg-indigo-900 border border-black flex flex-col items-center justify-center font-extrabold text-xs">
                              <span className="text-[8px] text-indigo-300 font-mono uppercase">Read</span>
                              <span className="text-sm font-black text-indigo-200 tracking-wider">
                                {Math.floor(readingTimer / 60)}:{(readingTimer % 60).toString().padStart(2, '0')}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-indigo-100 uppercase tracking-widest font-mono">Analyzing Paper</h4>
                              <p className="text-[10px] text-indigo-300 font-semibold">Mark Optional Questions to structure your time.</p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              setTestStage('active');
                              setActiveQuestionTimer(timeSpentCS1);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl border border-black shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs flex items-center gap-1.5"
                          >
                            Start Answering Now <ArrowRight size={14} />
                          </button>
                        </div>

                        {/* Middle panel showing exam context & PDF mockup */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          {/* Subject details card */}
                          <div className="md:col-span-5 bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-4">
                            <div className="flex items-center gap-2 text-indigo-600">
                              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                              <span className="text-[10px] font-black uppercase tracking-wider font-mono">Mock Exam: JAN-26</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900">Financial Reporting (Ind AS)</h4>
                            
                            <div className="border-t border-slate-100 pt-3 space-y-2">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-400 font-semibold">Total Weightage:</span>
                                <span className="text-slate-800 font-bold">11.0 Marks</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-400 font-semibold">Mandatory Reading:</span>
                                <span className="text-slate-800 font-bold">15 Minutes</span>
                              </div>
                            </div>

                            {/* Mark Optional questions area */}
                            <div className="border-t border-slate-100 pt-3 space-y-2">
                              <span className="text-[9px] uppercase font-mono text-slate-400 font-black tracking-widest block">Optional Questions Selector</span>
                              <div className="flex gap-2">
                                {['q1'].map((q) => {
                                  const isSelected = optionalQuestions.includes(q);
                                  return (
                                    <button
                                      key={q}
                                      onClick={() => {
                                        setOptionalQuestions(prev => 
                                          prev.includes(q) ? prev.filter(item => item !== q) : [...prev, q]
                                        );
                                      }}
                                      className={`px-3 py-1.5 rounded-lg border text-xs font-black transition-all ${
                                        isSelected 
                                          ? 'bg-rose-50 border-rose-450 text-rose-700 shadow-[1.5px_1.5px_0px_0px_rgba(225,29,72,1)]' 
                                          : 'bg-white border-black text-slate-700 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                                      }`}
                                    >
                                      {q} {isSelected ? ' (Optional)' : ' (Mark Optional)'}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Paper View mockup */}
                          <div className="md:col-span-7 bg-slate-800 rounded-2xl border border-black p-4 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-350 font-mono text-[10px] space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                              <span className="text-[9px] font-black uppercase text-indigo-400">PDF Reader View</span>
                              <span className="text-slate-500">Page 1 of 41</span>
                            </div>
                            <div className="space-y-2 leading-relaxed">
                              <div className="font-extrabold text-white text-xs border-b border-slate-700 pb-1 uppercase">PAPER - 1 : FINANCIAL REPORTING</div>
                              <div className="text-slate-400">Part I - Multiple Choice Questions</div>
                              <div className="text-indigo-300 mt-2">Case Scenario - I</div>
                              <p className="text-[9px] text-slate-450 leading-normal line-clamp-4">
                                You are auditing Fortunate Limited for the financial year ended 31st March 2025. Fortunate Limited prepares its financial statements on Companies (Indian Accounting Standards) Rules, 2015 (Ind AS). The following information is made available...
                              </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-750 p-2 rounded-lg text-slate-500 text-center font-bold">
                              📄 Read Mode Active (No marking/drawing permitted)
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STAGE 2: Timed Active Test */}
                    {testStage === 'active' && (
                      <motion.div
                        key="stage-active"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 w-full"
                      >
                        {/* Real-time Header Control Bar from Screenshot 2 */}
                        <div className="bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                          {/* Total Time left */}
                          <div className="md:col-span-3 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono font-bold block leading-none">TOTAL REMAINING</span>
                              <span className="font-black text-slate-800 text-lg tracking-tight">
                                {(() => {
                                  const hours = Math.floor(activeTotalTimer / 3600);
                                  const minutes = Math.floor((activeTotalTimer % 3600) / 60);
                                  const seconds = activeTotalTimer % 60;
                                  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                                })()}
                              </span>
                            </div>
                          </div>

                          {/* Question Explorer */}
                          <div className="md:col-span-3 border-l-0 md:border-l border-slate-200 pl-0 md:pl-4 flex flex-col justify-center">
                            <span className="text-[9px] text-slate-400 font-mono font-black tracking-widest block uppercase mb-1">Question Explorer</span>
                            <div className="flex gap-1.5">
                              {['CS-1', 'q1'].map((q) => {
                                const isSelected = testActiveQuestion === q;
                                const isOptional = optionalQuestions.includes(q);
                                return (
                                  <button
                                    key={q}
                                    onClick={() => {
                                      setTestActiveQuestion(q);
                                      setActiveQuestionTimer(q === 'CS-1' ? timeSpentCS1 : timeSpentQ1);
                                    }}
                                    className={`px-2 py-1 text-[10px] font-black rounded-md border transition-all ${
                                      isSelected
                                        ? 'bg-indigo-650 border-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                        : isOptional
                                          ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-[1px_1px_0px_0px_rgba(225,29,72,0.2)] line-through'
                                          : 'bg-white border-black text-slate-600 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                                    }`}
                                  >
                                    {q}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Attempting current question timer */}
                          <div className="md:col-span-3 border-l-0 md:border-l border-slate-200 pl-0 md:pl-4">
                            <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase leading-none mb-1">
                              Attempting <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-1 rounded font-black text-[8px] uppercase">{testActiveQuestion}</span>
                            </span>
                            <span className="font-extrabold text-slate-800 text-lg tracking-tight">
                              {(() => {
                                const minutes = Math.floor(activeQuestionTimer / 60);
                                const seconds = activeQuestionTimer % 60;
                                return `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                              })()}
                            </span>
                            
                            <div className="flex gap-1 mt-1 text-[8px] font-extrabold">
                              <span className="bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded uppercase">
                                {testActiveQuestion === 'CS-1' ? '6 Marks' : '5 Marks'}
                              </span>
                              <span className="bg-sky-50 text-sky-850 border border-sky-200 px-1.5 py-0.5 rounded uppercase">
                                {testActiveQuestion === 'CS-1' ? 'Std: 10.8m' : 'Std: 9.0m'}
                              </span>
                            </div>
                          </div>

                          {/* Control Buttons */}
                          <div className="md:col-span-3 flex justify-end gap-2 shrink-0">
                            <button
                              onClick={() => setTestIsPaused(!testIsPaused)}
                              className="px-3 py-2 border border-black bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1"
                            >
                              <Play size={12} className={testIsPaused ? 'fill-slate-700' : 'hidden'} />
                              <Pause size={12} className={testIsPaused ? 'hidden' : ''} />
                              {testIsPaused ? 'Resume' : 'Pause'}
                            </button>
                            <button
                              onClick={() => {
                                setTestStage('eval');
                                setTestIsPaused(true);
                              }}
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1"
                            >
                              <Check size={12} /> Submit
                            </button>
                          </div>
                        </div>

                        {/* Interactive testing sheet & PDF mockup */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          {/* Left side: Answer notepad mockup */}
                          <div className="md:col-span-6 bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                              <span className="text-[10px] font-black uppercase text-slate-500 font-mono">Current Question Paper Notepad</span>
                              <span className="text-[8px] bg-slate-100 border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded font-mono font-bold">Draft Workspace</span>
                            </div>
                            <div className="space-y-3 flex-grow">
                              <h4 className="text-xs font-black text-slate-900">
                                {testActiveQuestion === 'CS-1' 
                                  ? 'CS-1 (Consolidation of Entities)' 
                                  : 'q1 (Fair Value Measurement - Ind AS 113)'}
                              </h4>
                              <textarea
                                placeholder="Jot down structural formulas, calculated notes, and section reference codes here..."
                                className="w-full min-h-[120px] bg-amber-50/20 border border-black p-3 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-455 shadow-inner"
                              />
                            </div>
                            <div className="text-[9px] text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-250">
                              ℹ️ Real time tracking measures speed. Standard time limit is <strong>1.8 min / mark</strong>. Speed is updated live.
                            </div>
                          </div>

                          {/* Right side: PDF Question paper mock */}
                          <div className="md:col-span-6 bg-slate-800 rounded-2xl border border-black p-4 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-350 font-mono text-[9px] space-y-4 leading-relaxed">
                            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                              <span className="text-[8px] font-black uppercase text-indigo-400">PDF Reader View</span>
                              <span className="text-slate-500">Page 1 of 41</span>
                            </div>
                            
                            {testActiveQuestion === 'CS-1' ? (
                              <div className="space-y-1.5">
                                <div className="font-extrabold text-white text-xs">CS-1: Entities Consolidation</div>
                                <p className="text-slate-400 text-[9px]">
                                  (i) On 1st April 2024, Fortunate Limited had issued a 2 year mandatorily convertible (single) bond of ₹20,000,000. There are no transaction costs. The terms require Fortunate Limited to make interest payment of ₹100,000 each at the end of the financial year 2024-2025 and 2025-2026. The bond will mandatorily convert into 10,000 ordinary shares on 31st March 2026.
                                </p>
                                <p className="text-slate-400 text-[9px]">
                                  (ii) On 1st October 2024, Fortunate Limited issued 5 years, 9% per annum Optionally Convertible Debentures (OCD) for ₹4,00,00,000. The OCDs are convertible...
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                <div className="font-extrabold text-white text-xs">q1: Fair Value measurement</div>
                                <p className="text-slate-400 text-[9px]">
                                  Evaluate the fair value measurement of an asset held by Fortunate Limited which is traded in two active markets with different transaction costs. Define which market qualifies as the principal market under Ind AS 113.
                                </p>
                                <p className="text-slate-400 text-[9px]">
                                  Provide detailed accounting journal entries to measure the initial valuation and reconcile the transaction cost variances.
                                </p>
                              </div>
                            )}
                            <div className="flex justify-end gap-1 pt-1.5 border-t border-slate-700">
                              <button className="bg-slate-700 hover:bg-slate-600 text-white px-2 py-0.5 rounded text-[8px]">Zoom +</button>
                              <button className="bg-slate-700 hover:bg-slate-600 text-white px-2 py-0.5 rounded text-[8px]">Zoom -</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STAGE 3: Self-Evaluation */}
                    {testStage === 'eval' && (
                      <motion.div
                        key="stage-eval"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 w-full max-w-2xl mx-auto"
                      >
                        {/* Alert header from Screenshot 3 */}
                        <div className="flex items-start gap-4 bg-amber-50 border-2 border-black p-4 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <span className="p-2 bg-amber-100 text-amber-800 rounded-xl border border-black shrink-0 font-extrabold text-xs flex items-center gap-1">
                            <Activity size={12} /> Evaluation
                          </span>
                          <div>
                            <h3 className="font-black text-slate-900 text-sm md:text-base">Self-Evaluate Your Answers</h3>
                            <p className="text-xs text-slate-500 mt-1 font-semibold">
                              Check your answers against the suggested answers and allocate marks honestly for each question. Your actual taken time is shown for reference.
                            </p>
                          </div>
                        </div>

                        {/* Evaluation Input Table Card */}
                        <div className="bg-white border-2 border-black rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs table-fixed">
                              <thead>
                                <tr className="bg-slate-50 border-b border-black text-[10px] text-slate-400 font-mono font-black uppercase">
                                  <th className="p-3 pl-4 w-1/4 text-left">Question</th>
                                  <th className="p-3 w-1/4 text-left">Allocated Marks</th>
                                  <th className="p-3 w-1/4 text-center">Time Taken</th>
                                  <th className="p-3 pr-4 w-1/4 text-center">Marks Scored</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-150 font-bold text-slate-800">
                                
                                {/* Question 1 */}
                                <tr>
                                  <td className="p-3 pl-4 text-slate-900 font-black text-left w-1/4">CS-1</td>
                                  <td className="p-3 text-slate-500 text-left w-1/4">6.0 Marks</td>
                                  <td className="p-3 text-indigo-700 text-center w-1/4">
                                    <span className="bg-indigo-50 border border-indigo-250 text-indigo-850 px-2 py-0.5 rounded text-[10px] font-mono font-black inline-block" style={{ color: '#4f46e5', backgroundColor: '#eef2ff' }}>
                                      {Math.floor(timeSpentCS1 / 60)}m {timeSpentCS1 % 60}s
                                    </span>
                                  </td>
                                  <td className="p-3 pr-4 text-center w-1/4">
                                    <div className="flex items-center justify-center gap-2">
                                      <input 
                                        type="number"
                                        min="0"
                                        max="6"
                                        step="0.5"
                                        value={scoreCS1}
                                        onChange={(e) => setScoreCS1(e.target.value)}
                                        className="w-16 border border-black rounded-lg px-2 py-1 text-center font-black focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] bg-slate-50"
                                      />
                                      <span className="text-[10px] text-slate-455">/ 6.0</span>
                                    </div>
                                  </td>
                                </tr>

                                {/* Question 2 */}
                                <tr>
                                  <td className="p-3 pl-4 text-slate-900 font-black text-left w-1/4">q1</td>
                                  <td className="p-3 text-slate-500 text-left w-1/4">5.0 Marks</td>
                                  <td className="p-3 text-indigo-700 text-center w-1/4">
                                    <span className="bg-indigo-50 border border-indigo-250 text-indigo-850 px-2 py-0.5 rounded text-[10px] font-mono font-black inline-block" style={{ color: '#4f46e5', backgroundColor: '#eef2ff' }}>
                                      {Math.floor(timeSpentQ1 / 60)}m {timeSpentQ1 % 60}s
                                    </span>
                                  </td>
                                  <td className="p-3 pr-4 text-center w-1/4">
                                    <div className="flex items-center justify-center gap-2">
                                      <input 
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.5"
                                        value={scoreQ1}
                                        onChange={(e) => setScoreQ1(e.target.value)}
                                        className="w-16 border border-black rounded-lg px-2 py-1 text-center font-black focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] bg-slate-50"
                                      />
                                      <span className="text-[10px] text-slate-455">/ 5.0</span>
                                    </div>
                                  </td>
                                </tr>

                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Submit button container */}
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              setTestStage('summary');
                            }}
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-extrabold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-xs"
                          >
                            Save Evaluation & Calculate
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STAGE 4: Performance Summary */}
                    {testStage === 'summary' && (
                      <motion.div
                        key="stage-summary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 w-full"
                      >
                        {/* Score/Time Dashboard cards from Screenshot 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Final Score Card */}
                          <div className="bg-emerald-600 border border-black p-5 rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-white space-y-1">
                            <span className="text-[10px] font-black uppercase text-emerald-100 tracking-wider">Final Score</span>
                            <div className="text-3xl font-black">
                              {(() => {
                                const totalScored = parseFloat(scoreCS1 || 0) + parseFloat(scoreQ1 || 0);
                                const percentage = ((totalScored / 11.0) * 100).toFixed(1);
                                return `${percentage}%`;
                              })()}
                            </div>
                            <p className="text-xs text-emerald-100 font-semibold">
                              {(() => {
                                const totalScored = parseFloat(scoreCS1 || 0) + parseFloat(scoreQ1 || 0);
                                return `${totalScored.toFixed(1)} / 11.0 marks`;
                              })()}
                            </p>
                          </div>

                          {/* Total Time Card */}
                          <div className="bg-amber-500 border border-black p-5 rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-slate-950 space-y-1">
                            <span className="text-[10px] font-black uppercase text-amber-950 tracking-wider">Total Time</span>
                            <div className="text-3xl font-black">
                              {(() => {
                                const totalTime = timeSpentCS1 + timeSpentQ1;
                                const mins = Math.floor(totalTime / 60);
                                const secs = totalTime % 60;
                                return `${mins}m ${secs}s`;
                              })()}
                            </div>
                            <p className="text-xs text-amber-950 font-semibold">Standard: 19.8 m</p>
                          </div>

                          {/* Writing Speed Card */}
                          <div className="bg-indigo-650 border border-black p-5 rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-white space-y-1" style={{ backgroundColor: '#4f46e5' }}>
                            <span className="text-[10px] font-black uppercase text-indigo-100 tracking-wider">Writing Speed</span>
                            <div className="text-3xl font-black">
                              {(() => {
                                const totalTime = timeSpentCS1 + timeSpentQ1;
                                if (totalTime === 0) return '0.0';
                                // Speed is total attempted marks output per minute
                                const attemptedMarks = 11.0; 
                                const speed = (attemptedMarks / (totalTime / 60)).toFixed(1);
                                return speed;
                              })()}
                            </div>
                            <p className="text-xs text-indigo-100 font-semibold">Marks / Minute</p>
                          </div>

                        </div>

                        {/* Breakdown Table from Screenshot 4 */}
                        <div className="bg-white border border-black rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                          <h4 className="text-sm font-black text-slate-900">Question-by-Question Breakdown</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-50 border-b border-black text-[9px] text-slate-400 font-mono font-black uppercase">
                                  <th className="p-3 pl-4">Question</th>
                                  <th className="p-3">Score</th>
                                  <th className="p-3">Standard Time</th>
                                  <th className="p-3">Actual Time</th>
                                  <th className="p-3">Variance</th>
                                  <th className="p-3 pr-4">Efficiency</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-150 font-bold text-slate-800">
                                
                                {/* CS-1 Row */}
                                <tr>
                                  <td className="p-3 pl-4 text-slate-900 font-black">CS-1</td>
                                  <td className="p-3 text-rose-600 font-black">{(parseFloat(scoreCS1 || 0)).toFixed(1)} / 6.0</td>
                                  <td className="p-3 text-slate-400 font-mono">10m 48s</td>
                                  <td className="p-3 text-slate-700 font-mono">
                                    {Math.floor(timeSpentCS1 / 60)}m {timeSpentCS1 % 60}s
                                  </td>
                                  <td className="p-3">
                                    {(() => {
                                      const stdTimeSec = 648; 
                                      const variance = stdTimeSec - timeSpentCS1;
                                      const isPos = variance >= 0;
                                      const absMins = Math.floor(Math.abs(variance) / 60);
                                      const absSecs = Math.abs(variance) % 60;
                                      return (
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                          isPos ? 'bg-emerald-50 text-emerald-800 border border-emerald-250' : 'bg-rose-50 text-rose-800 border border-rose-200'
                                        }`}>
                                          {isPos ? '+' : '-'}{absMins}m {absSecs}s
                                        </span>
                                      );
                                    })()}
                                  </td>
                                  <td className="p-3 text-indigo-700 font-black pr-4">
                                    {(() => {
                                      if (timeSpentCS1 === 0) return '0.0 marks/m';
                                      const eff = (parseFloat(scoreCS1 || 0) / (timeSpentCS1 / 60)).toFixed(1);
                                      return `${eff} marks/m`;
                                    })()}
                                  </td>
                                </tr>

                                {/* q1 Row */}
                                <tr>
                                  <td className="p-3 pl-4 text-slate-900 font-black">q1</td>
                                  <td className="p-3 text-rose-600 font-black">{(parseFloat(scoreQ1 || 0)).toFixed(1)} / 5.0</td>
                                  <td className="p-3 text-slate-400 font-mono">9m 0s</td>
                                  <td className="p-3 text-slate-700 font-mono">
                                    {Math.floor(timeSpentQ1 / 60)}m {timeSpentQ1 % 60}s
                                  </td>
                                  <td className="p-3">
                                    {(() => {
                                      const stdTimeSec = 540; 
                                      const variance = stdTimeSec - timeSpentQ1;
                                      const isPos = variance >= 0;
                                      const absMins = Math.floor(Math.abs(variance) / 60);
                                      const absSecs = Math.abs(variance) % 60;
                                      return (
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                          isPos ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                                        }`}>
                                          {isPos ? '+' : '-'}{absMins}m {absSecs}s
                                        </span>
                                      );
                                    })()}
                                  </td>
                                  <td className="p-3 text-indigo-700 font-black pr-4">
                                    {(() => {
                                      if (timeSpentQ1 === 0) return '0.0 marks/m';
                                      const eff = (parseFloat(scoreQ1 || 0) / (timeSpentQ1 / 60)).toFixed(1);
                                      return `${eff} marks/m`;
                                    })()}
                                  </td>
                                </tr>

                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* AI Insights Card from Screenshot 4 */}
                        <div className="bg-indigo-50 border border-indigo-250 p-5 rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex gap-4 items-start">
                          <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl border border-black font-extrabold text-xs shrink-0 font-mono flex items-center gap-1">
                            <Sparkles size={12} className="fill-indigo-650" /> AI Insight
                          </span>
                          <div className="space-y-1 text-xs">
                            <h4 className="font-black text-slate-900">AI Performance Analysis</h4>
                            <p className="text-slate-500 font-semibold leading-relaxed">
                              {(() => {
                                const totalTime = timeSpentCS1 + timeSpentQ1;
                                const speed = totalTime > 0 ? (11.0 / (totalTime / 60)) : 0;
                                if (speed < 1.0) {
                                  return "Your writing speed (marks output per minute) is low. Try to stick strictly to the 1.8 mins/mark thumb rule to complete the paper on time.";
                                } else if (speed > 4.0) {
                                  return "Your writing speed is extremely fast, which might suggest high accuracy or a rushed attempt. Make sure conceptual clarity is maintained during calculations!";
                                } else {
                                  return "Your writing speed and pacing are optimal. Maintaining this marks-to-minute ratio will ensure comfortable completion of all sections in the final exam.";
                                }
                              })()}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons to restart simulator */}
                        <div className="flex justify-between items-center pt-2">
                          <button
                            onClick={() => {
                              setTestStage('reading');
                              setReadingTimer(891);
                              setActiveTotalTimer(10789);
                              setActiveQuestionTimer(11);
                              setTimeSpentCS1(25);
                              setTimeSpentQ1(0);
                              setScoreCS1('0.0');
                              setScoreQ1('0.0');
                              setOptionalQuestions([]);
                              setTestIsPaused(false);
                            }}
                            className="px-4 py-2 border border-black bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                          >
                            <RotateCcw size={12} /> Restart Exam Simulator
                          </button>

                          <a
                            href="https://drive.google.com/drive/folders/19pTyND5nk5zRfYvgpYzeFcg_5i9ZAIT1?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2.5 rounded-xl border border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] text-xs flex items-center gap-1.5"
                          >
                            <WindowsIcon className="w-3.5 h-3.5" /> Windows App
                          </a>
                          <a
                            href="https://drive.google.com/drive/folders/1_fGny8pmpkHU6SWmnnNXwpKM-nJoF1Gt?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2.5 rounded-xl border border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] text-xs flex items-center gap-1.5"
                          >
                            <div className="flex gap-0.5">
                              <AndroidIcon className="w-3.5 h-3.5" />
                              <Apple className="w-3.5 h-3.5 fill-current" />
                            </div>
                            Mobile/Tablet App
                          </a>
                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STUDENT WORKFLOW SECTION */}
      <section id="workflow" className="py-24 max-w-7xl mx-auto px-6 z-10 relative">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1 text-xs text-indigo-700 font-semibold uppercase tracking-wider">
              Discipline Blueprint
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Structured Step-by-Step Study Journey
            </h2>
            <p className="text-lg text-slate-500">
              Say goodbye to random study sequences. Click through the operational blueprint of successful candidates.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="relative flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-4 md:gap-0 bg-slate-50 p-4 md:p-6 rounded-2xl border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Horizontal Line connecting steps (hidden on mobile) */}
            <div className="absolute top-[38px] left-[8%] right-[8%] h-[2px] bg-slate-200 hidden md:block z-0" />
            
            {/* Active Highlight Line */}
            <div 
              className="absolute top-[38px] left-[8%] h-[2px] bg-indigo-600 hidden md:block z-0 transition-all duration-500" 
              style={{ width: `${(activeWorkflowStep / 5) * 84}%` }}
            />
            
            {['Plan', 'Study', 'Revise', 'Test', 'Analyze', 'Improve'].map((step, idx) => {
              const isActive = activeWorkflowStep === idx;
              const isPassed = activeWorkflowStep > idx;
              return (
                <button
                  key={step}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2.5 w-full md:w-auto px-4 py-2.5 md:py-0 focus:outline-none group transition-all duration-200 rounded-xl hover:bg-slate-100 md:hover:bg-transparent"
                >
                  {/* Step Badge Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-black border transition-all duration-300 ${
                    isActive 
                      ? 'bg-black border-black text-white scale-110 shadow-md ring-4 ring-amber-100' 
                      : isPassed 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-400 group-hover:border-slate-500 group-hover:text-slate-800'
                  }`}>
                    {isPassed ? <Check size={16} className="stroke-[3]" /> : `0${idx + 1}`}
                  </div>
                  
                  {/* Step Label */}
                  <div className="flex flex-col md:items-center">
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 font-medium'}`}>
                      {idx === 0 ? 'First' : idx === 1 ? 'Next' : idx === 2 ? 'Third' : idx === 3 ? 'Fourth' : idx === 4 ? 'Fifth' : 'Goal'}
                    </span>
                    <span className={`text-xs md:text-sm font-extrabold transition-colors duration-200 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}`}>
                      {step}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Stepper Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeWorkflowStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-black p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-3.5 py-1 rounded-full font-bold">
                  {workflowSteps[activeWorkflowStep].tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {workflowSteps[activeWorkflowStep].title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {workflowSteps[activeWorkflowStep].desc}
                </p>

                {/* Sub-milestones checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Blueprint Targets</div>
                  <ul className="space-y-2.5">
                    {workflowSteps[activeWorkflowStep].bullets?.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 border border-black flex items-center justify-center text-emerald-800">
                          <Check size={10} className="stroke-[3.5]" />
                        </div>
                        <span className="font-semibold text-slate-900">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a 
                    href="https://drive.google.com/drive/folders/19pTyND5nk5zRfYvgpYzeFcg_5i9ZAIT1?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-black hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold border border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px] transition-all"
                  >
                    <WindowsIcon className="w-4 h-4 text-indigo-400" /> Windows
                  </a>
                  <a 
                    href="https://drive.google.com/drive/folders/1_fGny8pmpkHU6SWmnnNXwpKM-nJoF1Gt?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-black hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold border border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px] transition-all"
                  >
                    <div className="flex gap-0.5 text-indigo-400">
                      <AndroidIcon className="w-4 h-4" />
                      <Apple className="w-4 h-4 fill-current" />
                    </div>
                    Mobile/Tablet
                  </a>
                </div>
              </div>

              {/* Workflow mockup preview replaced with real browser screenshot frames */}
              <div className="lg:col-span-7">
                <div className="w-full bg-white rounded-2xl border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-0 relative group transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  {/* Window Header */}
                  <div className="bg-slate-50 px-4 py-2.5 border-b-2 border-black flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {activeWorkflowStep === 0 && 'ca-next-door.app/dashboard'}
                      {activeWorkflowStep === 1 && 'ca-next-door.app/daily-tasks'}
                      {activeWorkflowStep === 2 && 'ca-next-door.app/revision-planner'}
                      {activeWorkflowStep === 3 && 'ca-next-door.app/mock-tests'}
                      {activeWorkflowStep === 4 && 'ca-next-door.app/day-log'}
                      {activeWorkflowStep === 5 && 'ca-next-door.app/late-tasks'}
                    </span>
                    <span className="w-8" />
                  </div>
                  <div className="bg-slate-50 overflow-hidden flex items-center justify-center">
                    {activeWorkflowStep === 0 && (
                      <img 
                        src="/dashboard-preview.png" 
                        alt="Overview Dashboard screenshot" 
                        className="w-full h-auto object-cover" 
                      />
                    )}
                    {activeWorkflowStep === 1 && (
                      <img 
                        src="/tasks-daily.png" 
                        alt="Daily Action Planner screenshot" 
                        className="w-full h-auto object-cover" 
                      />
                    )}
                    {activeWorkflowStep === 2 && (
                      <img 
                        src="/revision-preview.png" 
                        alt="Advanced Revision Scheduler screenshot" 
                        className="w-full h-auto object-cover" 
                      />
                    )}
                    {activeWorkflowStep === 3 && (
                      <img 
                        src="/mock-test-preview.png" 
                        alt="Simulated Mock Test Session screenshot" 
                        className="w-full h-auto object-cover" 
                      />
                    )}
                    {activeWorkflowStep === 4 && (
                      <img 
                        src="/tasks-log.png" 
                        alt="Activity Analyst Day Log screenshot" 
                        className="w-full h-auto object-cover" 
                      />
                    )}
                    {activeWorkflowStep === 5 && (
                      <img 
                        src="/tasks-backlog.png" 
                        alt="Late Tasks Backlog Tracker screenshot" 
                        className="w-full h-auto object-cover" 
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 7. WHY STUDENTS LOVE IT SECTION */}
      <section id="why" className="py-24 max-w-7xl mx-auto px-6 z-10 relative">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1 text-xs text-indigo-700 font-semibold uppercase tracking-wider">
              Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Serious CA Aspirants Love It
            </h2>
            <p className="text-lg text-slate-500">
              Discover how ambitious students secured ranks and passed examinations using the platform.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white border border-black p-6 rounded-3xl flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                  </div>

                  <p className="text-xs text-slate-655 italic leading-relaxed font-medium">
                    "{test.text}"
                  </p>
                </div>

                {/* Profile card & metrics badge */}
                <div className="flex justify-between items-center border-t-2 border-black pt-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full border border-black flex items-center justify-center font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] uppercase shrink-0 ${test.color}`}>
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">{test.name}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold leading-tight mt-0.5">{test.role}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-black bg-emerald-50 text-emerald-800 border border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
                    {test.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-white border border-black rounded-3xl p-12 text-center space-y-8 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Your CA Journey Deserves Better Systems.
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              Ditch fragile planning spreadsheets and generic checklist books. Build deep visual consistency, systematic review routines, and walk into the examination hall rank-ready.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a 
              href="https://drive.google.com/drive/folders/19pTyND5nk5zRfYvgpYzeFcg_5i9ZAIT1?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
            >
              <WindowsIcon className="w-5 h-5" /> Download for Windows
            </a>
            <a 
              href="https://drive.google.com/drive/folders/1_fGny8pmpkHU6SWmnnNXwpKM-nJoF1Gt?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
            >
              <div className="flex gap-1 items-center">
                <AndroidIcon className="w-5 h-5" />
                <Apple className="w-5 h-5 fill-current" />
              </div>
              Download for Mobile/Tablet
            </a>
            <button 
              onClick={() => setShowDemoModal(true)}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-extrabold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
            >
              <Play size={16} className="fill-slate-900 text-slate-900" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t-4 border-black py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-xs">
          
          {/* Logo & Info column inside dark neobrutalist card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="CA Next Door Logo" 
                  className="w-9 h-9 object-contain rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                />
                <span className="font-black text-lg tracking-tight text-white">
                  CA Next Door
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed font-semibold">
                The high-fidelity preparation and syllabus tracking command center built specifically for ambitious CA Aspirants. Secure ranks with better preparation discipline.
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-black text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" /> Platform Core
            </h4>
            <div className="flex flex-col gap-2">
              <a 
                href="#features" 
                className="inline-block px-3 py-1.5 rounded-lg border border-transparent hover:border-black hover:bg-slate-950 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] font-bold text-slate-400 hover:shadow-[1.5px_1.5px_0px_0px_rgba(99,102,241,1)] transition-all w-max"
              >
                Features list
              </a>
              <a 
                href="#revision" 
                className="inline-block px-3 py-1.5 rounded-lg border border-transparent hover:border-black hover:bg-slate-950 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] font-bold text-slate-400 hover:shadow-[1.5px_1.5px_0px_0px_rgba(99,102,241,1)] transition-all w-max"
              >
                Revision Optimizer
              </a>
              <a 
                href="#tests" 
                className="inline-block px-3 py-1.5 rounded-lg border border-transparent hover:border-black hover:bg-slate-950 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] font-bold text-slate-400 hover:shadow-[1.5px_1.5px_0px_0px_rgba(99,102,241,1)] transition-all w-max"
              >
                Mock Test Arena
              </a>
              <a 
                href="#workflow" 
                className="inline-block px-3 py-1.5 rounded-lg border border-transparent hover:border-black hover:bg-slate-950 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] font-bold text-slate-400 hover:shadow-[1.5px_1.5px_0px_0px_rgba(99,102,241,1)] transition-all w-max"
              >
                Candidate blueprint
              </a>
            </div>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-black text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" /> Help & Operations
            </h4>
            <p className="text-slate-400 leading-relaxed font-semibold">
              Have questions regarding the revision dashboard setup or installation widget bugs? Our student support squad is here to assist.
            </p>
            <div className="pt-2">
              <a 
                href="mailto:canextdoor.office@gmail.com" 
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-extrabold text-xs"
              >
                📩 canextdoor.office@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="max-w-7xl mx-auto border-t-2 border-black mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-semibold">
          <p>© 2026 CA Next Door. All rights reserved. Designed for ranks.</p>
          <div className="flex items-center gap-4 text-[10px] uppercase font-mono">
            <a 
              href="https://t.me/canextdoorofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors font-black text-slate-400"
            >
              Telegram community
            </a>
            <span>•</span>
            <span className="text-emerald-500 font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Platform Active
            </span>
          </div>
        </div>
      </footer>

      {/* WATCH DEMO VIDEO MODAL */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDemoModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl bg-white border border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-10"
            >
              {/* Modal Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-black flex justify-between items-center">
                <span className="font-extrabold text-slate-900 flex items-center gap-2 text-sm md:text-base">
                  <Play size={16} className="fill-indigo-600 text-indigo-600" /> CA Next Door Video Walkthrough Library
                </span>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="p-1.5 rounded-lg border border-black bg-white hover:bg-slate-50 text-slate-700 transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Sidebar: Selector list */}
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-black p-4 md:p-6 bg-slate-50 space-y-4 max-h-[350px] lg:max-h-[500px] overflow-y-auto">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-mono bg-black text-white px-2.5 py-0.5 rounded-md border border-black font-extrabold tracking-wider w-max">
                      Tutorial Engine
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2">Available Guides</h3>
                    <p className="text-xs text-slate-500 font-medium">Click on any video below to switch lessons and learn how to use CA Next Door.</p>
                  </div>
                  
                  <div className="space-y-3.5 pt-2">
                    {demoVideos.map((video) => {
                      const IconComponent = video.icon;
                      const isSelected = selectedDemoVideoId === video.id;
                      return (
                        <button
                          key={video.id}
                          onClick={() => setSelectedDemoVideoId(video.id)}
                          className={`w-full text-left p-4 rounded-2xl border border-black transition-all flex gap-3.5 items-start ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                          }`}
                        >
                          <div className={`p-2 rounded-xl border border-black shrink-0 ${
                            isSelected ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-900'
                          }`}>
                            <IconComponent size={18} />
                          </div>
                          <div className="space-y-1 w-full min-w-0">
                            <div className="flex justify-between items-center gap-2">
                              <span className={`text-xs font-black uppercase tracking-wider ${
                                isSelected ? 'text-indigo-200' : 'text-indigo-600'
                              }`}>
                                {video.badge}
                              </span>
                              {video.duration === 'Coming Soon' && (
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-black ${
                                  isSelected ? 'bg-indigo-700 text-white border-indigo-900' : 'bg-slate-50 text-slate-600'
                                }`}>
                                  {video.duration}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs md:text-sm font-black leading-snug truncate">{video.title}</h4>
                            <p className={`text-[10px] leading-relaxed line-clamp-2 ${
                              isSelected ? 'text-indigo-100' : 'text-slate-500'
                            }`}>
                              {video.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Area: Player or Placeholder */}
                <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between overflow-hidden">
                  
                  {/* Current Active Video Container */}
                  {(() => {
                    const activeVideo = demoVideos.find(v => v.id === selectedDemoVideoId) || demoVideos[0];
                    if (activeVideo.url) {
                      return (
                        <div className="w-full aspect-video lg:aspect-auto lg:h-[400px] bg-black relative animate-fade-in">
                          <iframe 
                            src={`${activeVideo.url}?autoplay=1&rel=0`} 
                            title={activeVideo.title}
                            className="absolute inset-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                          />
                        </div>
                      );
                    } else {
                      // Coming Soon Premium State Placeholder
                      return (
                        <div className="w-full min-h-[300px] lg:h-[400px] bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                          {/* Decorative subtle background blobs */}
                          <div className="absolute top-[20%] left-[20%] w-[150px] h-[150px] rounded-full blur-[80px] opacity-[0.25] bg-indigo-500 pointer-events-none" />
                          <div className="absolute bottom-[20%] right-[20%] w-[150px] h-[150px] rounded-full blur-[80px] opacity-[0.25] bg-purple-500 pointer-events-none" />
                          
                          <div className="space-y-6 relative z-10 max-w-sm">
                            <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 animate-pulse">
                              <Sparkles size={36} />
                            </div>
                            
                            <div className="space-y-2">
                              <span className="text-[9px] uppercase font-mono bg-indigo-500 text-white px-2 py-0.5 rounded font-black border border-indigo-400 tracking-wider">
                                Video Coming Soon
                              </span>
                              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">{activeVideo.title}</h3>
                              {activeVideo.description && (
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                  {activeVideo.description}
                                </p>
                              )}
                            </div>

                            {/* Quick Action to Telegram */}
                            <div className="pt-2">
                              <a
                                href="https://t.me/canextdoorofficial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-black rounded-xl text-xs font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                              >
                                <MessageSquare size={14} /> Join Telegram for Updates
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })()}

                  {/* Active Video Info Footer inside right column */}
                  {(() => {
                    const activeVideo = demoVideos.find(v => v.id === selectedDemoVideoId) || demoVideos[0];
                    return (
                      <div className="bg-slate-900 border-t border-slate-800 p-4 px-6 flex justify-between items-center text-xs">
                        <div className="space-y-1 min-w-0">
                          <p className="text-slate-400 font-medium text-[10px] uppercase font-mono tracking-wider">Now Playing</p>
                          <h4 className="text-white font-extrabold truncate">{activeVideo.title}</h4>
                        </div>
                      </div>
                    );
                  })()}

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DOWNLOAD / PAY MODAL */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownloadModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header Details */}
              <div className="text-center space-y-2 mt-2">
                <img 
                  src="/logo.png" 
                  alt="CA Next Door" 
                  className="w-12 h-12 mx-auto object-contain"
                />
                <h3 className="text-lg font-black text-slate-900">Unlock Lifetime Rank Access</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Scan the UPI QR code below using any payment app (GPay, PhonePe, Paytm) to activate your account.
                </p>
              </div>

              {/* QR Image Area */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 my-6">
                <img 
                  src="/payment-qr.jpeg" 
                  alt="UPI QR Code Payment" 
                  className="w-[180px] h-[180px] rounded-xl mx-auto object-cover border border-slate-200"
                />
                <div className="flex justify-between items-center text-[10px] mt-4 px-2 font-mono text-slate-400">
                  <span>Merchant: CA Next Door</span>
                  <span>UPI ID: study@canextdoor</span>
                </div>
              </div>

              {/* Confirm details / Done action */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-800 border-t border-b border-slate-200 py-3">
                  <span>1x Syllabus Tracker & Revision Engine License</span>
                  <span className="text-indigo-600">₹999 / Lifetime</span>
                </div>

                <a 
                  href="https://forms.gle/dYdoFBPXWjQThG4YA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-center font-extrabold text-sm block transition-all shadow-md shadow-indigo-100"
                >
                  I've Done the Payment 👍
                </a>
                
                <p className="text-[10px] text-slate-400 text-center leading-normal">
                  Payment verification takes ~10 minutes. An activation link + onboarding tutorial will be sent immediately to your registered email ID.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RESOURCES COMING SOON TOAST */}
      <AnimatePresence>
        {showResourcesToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-slate-900 border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white flex items-center gap-3 max-w-sm"
          >
            <div className="bg-indigo-600 p-2 rounded-xl border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-white shrink-0">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Resources Coming Soon!</h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">We are compiling revision guides, test papers, and formula sheets. Stay tuned!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
