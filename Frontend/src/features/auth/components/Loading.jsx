import React from "react";

const Loading = () => {
     return (
            <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-950">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-indigo-500"></div>

                <h1 className="mt-6 text-3xl font-bold text-white">
                    Loading...
                </h1>

                <p className="mt-2 text-lg text-gray-400">
                    Please wait while we prepare everything.
                </p>
            </main>
        )
    }

export default Loading;