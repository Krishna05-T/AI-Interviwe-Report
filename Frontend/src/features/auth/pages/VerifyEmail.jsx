import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../components/Loading";

const VerifyEmail = () => {

    const { loading, error, handleVerifyEmail } = useAuth();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const email = localStorage.getItem("verifyEmail");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verifiedUser = await handleVerifyEmail({ email, otp });

        if (!verifiedUser) {
            return;
        }

        localStorage.removeItem("verifyEmail");
        navigate("/login");
    }

    if (loading) {
        return(
            <Loading />
        )
    }

    return (
        <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-[#1e293b] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Verify Email
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Enter the OTP sent to {email || "your email"}
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="otp" className="text-gray-300 text-sm font-medium block">OTP</label>

                        <input
                            onChange={(e) => { setOtp(e.target.value) }}
                            value={otp}
                            type="text"
                            id="otp"
                            name="otp"
                            inputMode="numeric"
                            maxLength="6"
                            placeholder="Enter 6 digit OTP"
                            className="w-full rounded-xl px-4 py-3 bg-[#0f172a] mt-2 border border-gray-600 outline-none text-white transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 hover:scale-102 duration-300 ease-in-out"
                    >
                        Verify Email
                    </button>

                </form>

                <p className="mt-8 text-center text-gray-400">
                    Wrong email?
                    <a
                        href="/register"
                        className="ml-2 inline-block origin-center font-semibold text-indigo-400 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-indigo-300"
                    >
                        Register again
                    </a>
                </p>

            </div>

        </main>
    )
}

export default VerifyEmail;
