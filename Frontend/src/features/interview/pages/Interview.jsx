import React, { useEffect, useState } from "react";
import { useInterview } from "../Hooks/useInterview";
import { useParams } from "react-router";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];


const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg mb-4">
      <div
        className="flex justify-between items-center p-4 cursor-pointer text-white"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold">Q{index + 1}</span>
        <p className="flex-1 ml-4">{item.question}</p>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="p-4 space-y-3 text-gray-300">
          <div>
            <span className="text-sm font-semibold text-indigo-400">
              Intention
            </span>
            <p>{item.intention}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-green-400">
              Model Answer
            </span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg p-4 mb-4 text-white">
    <div className="flex items-center mb-2">
      <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm mr-2">
        Day {day.day}
      </span>
      <h3 className="font-semibold">{day.focus}</h3>
    </div>
    <ul className="list-disc ml-6 text-gray-300">
      {day.tasks.map((task, i) => (
        <li key={i}>{task}</li>
      ))}
    </ul>
  </div>
);

const InterviewLayout = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, generateReportById, loading } = useInterview();
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      generateReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-indigo-500"></div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Loading...
        </h1>

        <p className="mt-2 text-lg text-gray-400">
          Please wait while we prepare your interview plan.
        </p>
      </main>
    )
  }

  const scoreColor =
    report.matchScore >= 80
      ? "text-green-400"
      : report.matchScore >= 60
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <main className="min-h-screen  bg-gradient-to-br from-slate-950 via-gray-900 to-black px-6 py-10">
      <div className="mx-auto flex max-w-8xl gap-8 lg:flex-row">
        {/* Left Nav */}
        <nav className="w-full lg:w-1/4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between">
          <div>
            <p className="font-bold text-white mb-4">Sections</p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`block w-full h-[70px] text-left px-3 py-2 rounded mb-2 transition ${activeNav === item.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold transition hover:bg-indigo-700">
            Download Resume
          </button>
        </nav>

        {/* Center Content */}
        <main className="flex-1 rounded-3xl text-xl text-gray-300 border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 overflow-y-auto">
          {activeNav === "technical" && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                Technical Questions
              </h2>
              {report.technicalQuestion.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                Behavioral Questions
              </h2>
              {report.behavioralQuestion.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                Preparation Road Map
              </h2>
              {report.preparationPlan.map((day) => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </section>
          )}
        </main>

        {/* Right Sidebar */}
        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 text-white">
          <div className="mb-6">
            <p className="font-bold text-2xl">Match Score</p>
            <div className="flex items-center justify-center w-34 h-34 mx-auto mt-4 rounded-full border-4 border-indigo-500 bg-gray-900/70 shadow-lg">
              <span className={`text-3xl font-bold ${scoreColor}`}>
                {report.matchScore}%
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-3 text-center">
              Strong match for this role
            </p>
          </div>

          <div>
            <p className="font-bold text-xl mb-4">Skill Gaps</p>
            <div className="flex flex-wrap gap-2">
              {report.skillGap.map((gap, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded text-lg ${gap.severity === "high"
                      ? "bg-red-500/20 text-red-400"
                      : gap.severity === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );

};

export default InterviewLayout;
