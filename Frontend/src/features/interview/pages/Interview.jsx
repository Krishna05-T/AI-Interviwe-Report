// import React, { useMemo, useState } from "react";
// import { useLocation, useParams } from "react-router";

// const NAV_ITEMS = [
//     {
//         id: "technical",
//         label: "Technical Questions",
//         icon: (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="16 18 22 12 16 6" />
//                 <polyline points="8 6 2 12 8 18" />
//             </svg>
//         ),
//     },
//     {
//         id: "behavioral",
//         label: "Behavioral Questions",
//         icon: (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//             </svg>
//         ),
//     },
//     {
//         id: "roadmap",
//         label: "Road Map",
//         icon: (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polygon points="3 11 22 2 13 21 11 13 3 11" />
//             </svg>
//         ),
//     },
// ];

// const sampleReport = {
//     matchScore: 92,
//     technicalQuestion: [
//         '{"question":"Explain the difference between useState and useContext in React.","intention":"To check React state management understanding.","answer":"useState manages local component state. useContext shares state across a component tree without prop drilling."}',
//         '{"question":"How do you handle JWT authentication in a MERN app?","intention":"To assess practical security knowledge.","answer":"Create tokens after login, store them safely, verify them in middleware, and attach the decoded user to the request."}',
//     ],
//     behavioralQuestion: [
//         '{"question":"Tell me about a time you learned a new technology quickly.","intention":"To assess adaptability.","answer":"Use the STAR method and explain the situation, learning process, action, and result."}',
//     ],
//     skillGap: [
//         '{"skill":"CI/CD Pipelines","severity":"medium"}',
//         '{"skill":"AWS/Azure Deployment","severity":"low"}',
//         '{"skill":"Advanced TypeScript","severity":"low"}',
//     ],
//     preparationPlan: [
//         '{"day":1,"focus":"React Core Concepts","tasks":"Review hooks, context, props, and component state."}',
//         '{"day":2,"focus":"Node.js and Express","tasks":"Practice routes, middleware, validation, and error handling."}',
//         '{"day":3,"focus":"MongoDB and Mongoose","tasks":"Review schemas, indexes, queries, and aggregation basics."}',
//     ],
// };

// const parseItem = (item) => {
//     if (!item) return {};
//     if (typeof item === "object") return item;

//     try {
//         return JSON.parse(item.trim());
//     } catch {
//         return { text: item };
//     }
// };

// const normalizeList = (list = []) => list.map(parseItem);

// const normalizeTasks = (tasks) => {
//     if (Array.isArray(tasks)) return tasks;
//     if (!tasks) return [];
//     return [tasks];
// };

// const getScoreColor = (score = 0) => {
//     if (score >= 80) return "border-emerald-400/60 bg-emerald-500/10 text-emerald-300";
//     if (score >= 60) return "border-amber-400/60 bg-amber-500/10 text-amber-300";
//     return "border-rose-400/60 bg-rose-500/10 text-rose-300";
// };

// const QuestionCard = ({ item, index }) => {
//     const [open, setOpen] = useState(index === 0);

//     return (
//         <article className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20">
//             <button
//                 type="button"
//                 onClick={() => setOpen((value) => !value)}
//                 className="flex w-full items-center gap-4 p-5 text-left"
//             >
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
//                     Q{index + 1}
//                 </span>
//                 <p className="min-w-0 flex-1 text-base font-semibold leading-7 text-white">
//                     {item.question || item.text || "Question unavailable"}
//                 </p>
//                 <span className={`text-gray-400 transition ${open ? "rotate-180" : ""}`}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="6 9 12 15 18 9" />
//                     </svg>
//                 </span>
//             </button>

//             {open && (
//                 <div className="space-y-4 border-t border-white/10 p-5 pt-4">
//                     {item.intention && (
//                         <section>
//                             <span className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
//                                 Intention
//                             </span>
//                             <p className="text-sm leading-6 text-gray-300">{item.intention}</p>
//                         </section>
//                     )}

//                     {item.answer && (
//                         <section>
//                             <span className="mb-2 inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
//                                 Model Answer
//                             </span>
//                             <p className="text-sm leading-6 text-gray-300">{item.answer}</p>
//                         </section>
//                     )}
//                 </div>
//             )}
//         </article>
//     );
// };

// const RoadMapDay = ({ day }) => (
//     <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20">
//         <div className="mb-4 flex items-center gap-3">
//             <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-sm font-bold text-indigo-200">
//                 Day {day.day}
//             </span>
//             <h3 className="text-lg font-semibold text-white">{day.focus || "Practice"}</h3>
//         </div>

//         <ul className="space-y-3">
//             {normalizeTasks(day.tasks).map((task, index) => (
//                 <li key={index} className="flex gap-3 rounded-xl border border-white/10 bg-gray-950/50 p-3 text-sm leading-6 text-gray-300">
//                     <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
//                     {task}
//                 </li>
//             ))}
//         </ul>
//     </article>
// );

// const Interview = () => {
//     const [activeNav, setActiveNav] = useState("technical");
//     const location = useLocation();
//     const { interviewId } = useParams();
//     const report = location.state?.report || sampleReport;

//     const technicalQuestions = useMemo(
//         () => normalizeList(report.technicalQuestions || report.technicalQuestion),
//         [report.technicalQuestions, report.technicalQuestion]
//     );
//     const behavioralQuestions = useMemo(
//         () => normalizeList(report.behavioralQuestions || report.behavioralQuestion),
//         [report.behavioralQuestions, report.behavioralQuestion]
//     );
//     const preparationPlan = useMemo(
//         () => normalizeList(report.preparationPlan),
//         [report.preparationPlan]
//     );
//     const skillGaps = useMemo(
//         () => normalizeList(report.skillGaps || report.skillGap),
//         [report.skillGaps, report.skillGap]
//     );

//     const scoreColor = getScoreColor(report.matchScore);

//     return (
//         <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black px-6 py-10 text-white">
//             <div className="mx-auto grid min-h-[850px] max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[260px_minmax(0,1fr)_310px]">
//                 <nav className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:border-white/15">
//                     <div className="lg:mt-56">
//                         <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
//                             Sections
//                         </p>

//                         <div className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
//                             {NAV_ITEMS.map((item) => (
//                                 <button
//                                     key={item.id}
//                                     type="button"
//                                     onClick={() => setActiveNav(item.id)}
//                                     className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
//                                         activeNav === item.id
//                                             ? "border-indigo-400 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/20"
//                                             : "border-white/15 bg-gray-950/40 text-gray-300 hover:border-indigo-400/70 hover:text-white"
//                                     }`}
//                                 >
//                                     <span className="text-indigo-300">{item.icon}</span>
//                                     {item.label}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <button
//                         type="button"
//                         className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
//                     >
//                         <span>
//                             <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
//                                 <path d="M12 16 6 10h4V3h4v7h4l-6 6Zm-7 5v-2h14v2H5Z" />
//                             </svg>
//                         </span>
//                         Download Resume
//                         {interviewId ? "" : ""}
//                     </button>
//                 </nav>

//                 <section className="min-h-[650px] border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:border-white/15">
//                     {activeNav === "technical" && (
//                         <section>
//                             <div className="mb-6 flex items-center justify-between gap-4">
//                                 <h2 className="text-3xl font-bold text-white">Technical Questions</h2>
//                                 <span className="rounded-full border border-white/10 bg-gray-950/50 px-4 py-2 text-sm text-gray-300">
//                                     {technicalQuestions.length} questions
//                                 </span>
//                             </div>

//                             <div className="max-h-[720px] space-y-4 overflow-y-auto pr-2">
//                                 {technicalQuestions.map((question, index) => (
//                                     <QuestionCard key={index} item={question} index={index} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}

//                     {activeNav === "behavioral" && (
//                         <section>
//                             <div className="mb-6 flex items-center justify-between gap-4">
//                                 <h2 className="text-3xl font-bold text-white">Behavioral Questions</h2>
//                                 <span className="rounded-full border border-white/10 bg-gray-950/50 px-4 py-2 text-sm text-gray-300">
//                                     {behavioralQuestions.length} questions
//                                 </span>
//                             </div>

//                             <div className="max-h-[720px] space-y-4 overflow-y-auto pr-2">
//                                 {behavioralQuestions.map((question, index) => (
//                                     <QuestionCard key={index} item={question} index={index} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}

//                     {activeNav === "roadmap" && (
//                         <section>
//                             <div className="mb-6 flex items-center justify-between gap-4">
//                                 <h2 className="text-3xl font-bold text-white">Preparation Road Map</h2>
//                                 <span className="rounded-full border border-white/10 bg-gray-950/50 px-4 py-2 text-sm text-gray-300">
//                                     {preparationPlan.length}-day plan
//                                 </span>
//                             </div>

//                             <div className="max-h-[720px] space-y-4 overflow-y-auto pr-2">
//                                 {preparationPlan.map((day, index) => (
//                                     <RoadMapDay key={day.day || index} day={day} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}
//                 </section>

//                 <aside className="p-6">
//                     <div className="mb-8 rounded-3xl border border-white/10 bg-gray-950/50 p-6 text-center">
//                         <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
//                             Match Score
//                         </p>
//                         <div className={`mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 ${scoreColor}`}>
//                             <span className="text-4xl font-black">{report.matchScore ?? "--"}</span>
//                             <span className="mt-3 text-lg font-bold">%</span>
//                         </div>
//                         <p className="mt-4 text-sm text-gray-400">Strong match for this role</p>
//                     </div>

//                     <div className="border-t border-white/10 pt-6">
//                         <p className="mb-4 inline-flex rounded-lg border border-white/15 bg-gray-950/50 px-4 py-2 text-lg font-semibold text-white">
//                             Skill Gaps
//                         </p>

//                         <div className="flex flex-wrap gap-3">
//                             {skillGaps.map((gap, index) => (
//                                 <span
//                                     key={index}
//                                     className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
//                                         gap.severity === "high"
//                                             ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
//                                             : gap.severity === "medium"
//                                                 ? "border-amber-400/40 bg-amber-500/10 text-amber-200"
//                                                 : "border-indigo-400/40 bg-indigo-500/10 text-indigo-200"
//                                     }`}
//                                 >
//                                     {gap.skill || gap.text}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </aside>
//             </div>
//         </main>
//     );
// };

// export default Interview;
