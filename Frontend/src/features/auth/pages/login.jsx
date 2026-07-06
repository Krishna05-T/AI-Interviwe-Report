import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

function Login() {

    const navigate = useNavigate()
    const { loading, handleLogin } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault();
        await handleLogin({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
           <Loading />
        )
    }

    return (
        <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-[#1e293b] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

                <div className="mb-8 text-center">


                    <h1 className="text-3xl font-bold text-white ">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Login to your account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Email Address or Username
                        </label>

                        <input
                            value={username || email}
                            onChange={(e) => {
                                const v = e.target.value;
                                if (v.includes("@")) {
                                    setEmail(v)
                                    setUsername("")
                                } else {
                                    setUsername(v)
                                    setEmail("")
                                }
                            }}
                            type="text"
                            placeholder="Enter your email or username"
                            className="w-full rounded-xl border border-gray-600 bg-[#0f172a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-300">
                                Password
                            </label>

                        </div>

                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-gray-600 bg-[#0f172a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white  transition  hover:bg-indigo-700 hover:scale-102 duration-300 ease-in-out"
                    >
                        Sign In
                    </button>

                </form>

                <p className="mt-8 text-center text-gray-400">
                    Don't have an account?
                    <a
                        href="/register"
                        className="ml-2 inline-block origin-center font-semibold text-indigo-400 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-indigo-300"
                    >
                        Register
                    </a>
                </p>

            </div>

        </main>
    );
}

export default Login;
