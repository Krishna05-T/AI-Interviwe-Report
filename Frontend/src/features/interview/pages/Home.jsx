import React from "react";

const Home = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black px-6 py-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">

                {/* Left Side */}
                <div className="flex-1 min-h-[850px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

                    <h1 className="mb-2 text-3xl font-bold text-white">
                        Job Description
                    </h1>

                    <p className="mb-6 text-gray-400">
                        Paste the job description you want to analyze.
                    </p>

                    <textarea
                        name="jobDescription"
                        id="jobDescription"
                        placeholder="Paste the complete job description here..."
                        className="h-[500px] w-full resize-none rounded-xl border border-gray-700 bg-gray-900/70 p-5 text-white placeholder:text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
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
                            id="selfDescription"
                            rows={8}
                            placeholder="Tell us about yourself, your skills, experience, achievements, and career goals..."
                            className="w-full resize-none rounded-xl border border-gray-700 bg-gray-900/70 p-4 text-white placeholder:text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button
                        className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
                    >
                        🚀 Generate Interview Report
                    </button>

                </div>

            </div>
        </main>
    );
};

export default Home;