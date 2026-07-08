import React, { useState, useRef, useEffect } from "react";
import { useInterview } from "../Hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/Hooks/useAuth";


const Home = () => {

    const { loading, generateReport, reports, getAllReports } = useInterview()
    const { handleLogout } = useAuth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (!data) {
            console.log("Report not generated")
        }
        navigate(`/interview/${data._id}`)
    }

    const handleLogoutClick = async () => {
        await handleLogout()
        navigate("/login")
    }

    useEffect(() => {
        getAllReports()
    }, [])
    if (loading) {
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

   return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Interview Master</h1>
            <p className="mt-1 text-gray-400">Create and review your interview plans.</p>
          </div>
          <button
            onClick={handleLogoutClick}
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>

        {/* Top Section: Left + Right */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Side */}
          <div className="flex-1 min-h-[850px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
            <h1 className="mb-2 text-3xl font-bold text-white">
              Job Description
            </h1>
            <p className="mb-6 text-gray-400 text-xl">
              Paste the job description you want to analyze.
            </p>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the complete job description here..."
              className="h-[500px] w-full resize-none rounded-xl border border-gray-700 text-xl bg-gray-900/70 p-5 text-white placeholder:text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[520px] min-h-[850px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Candidate Details
            </h2>

            {/* Resume */}
            <div className="mb-6">
              <label
                htmlFor="resume"
                className="mb-2 block font-medium text-gray-300"
              >
                Upload Resume (PDF)
              </label>
              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                accept=".pdf"
                className="block w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
              />
            </div>

            {/* Self Description */}
            <div className="mb-8">
              <label
                htmlFor="selfDescription"
                className="mb-2 block font-medium text-gray-300"
              >
                Self Description
              </label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                rows={8}
                placeholder="Tell us about yourself, your skills, experience, achievements, and career goals..."
                className="w-full resize-none rounded-xl border text-xl border-gray-700 bg-gray-900/70 p-4 text-white placeholder:text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Button */}
            <button
              onClick={handleGenerateReport}
              className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
            >
              🚀 Generate Interview Report
            </button>
          </div>
        </div>

        {/* Bottom Section: Recent Report List */}
        {reports.length > 0 && (
          <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-white">
              My Recent Interview Plans
            </h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <li
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group cursor-pointer rounded-xl border border-gray-700 bg-gray-900/70 p-6 transition duration-300 hover:border-indigo-500 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400">
                    {report.title || "Untitled Position"}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    📅 Generated on{" "}
                    <span className="text-gray-300">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
