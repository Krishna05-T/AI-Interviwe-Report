import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../components/Loading";


const Register = () => {

    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate()
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({fullname, username, email, password})
        navigate("/")
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


                    <h1 className="text-3xl font-bold text-white ">
                        Welcome
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Register to your account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="fullname" className="text-gray-300 text-sm font-medium block">Fullname</label>

                        <input
                            onChange={(e) => { setFullname(e.target.value) }}
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Enter your name"
                            className="w-full rounded-xl px-4 py-3 bg-[#0f172a] mt-2 border border-gray-600 outline-none text-white transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="text-gray-300 text-sm font-medium mb-2 block">Username</label>

                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            className="w-full rounded-2xl bg-[#0f172a] px-4 py-3 text-white
                            border border-gray-600 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                            Email Address
                        </label>

                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-600 bg-[#0f172a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <div htmlFor="password" className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-300">
                                Password
                            </label>

                        </div>

                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-gray-600 bg-[#0f172a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white  transition  hover:bg-indigo-700 hover:scale-102 duration-300 ease-in-out"
                    >
                        Sign In
                    </button>

                </form>

                <p className="mt-8 text-center text-gray-400">
                    Already have an account?
                    <a
                        href="/login"
                        className="ml-2 inline-block origin-center font-semibold text-indigo-400 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-indigo-300"
                    >
                        Login
                    </a>
                </p>

            </div>

        </main>
    )
}

export default Register;