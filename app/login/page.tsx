'use client';

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { playerContext } from "../context/playerContext";
import LoginButton from "../components/buttons/loginBtn";

export default function Login() {
    const router = useRouter();
    const context = useContext(playerContext);
    if (!context) return null;
    const { AssignPlayerData } = context;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const payload = await res.json();

            if (!res.ok) {
                setError(payload.error || "Login failed");
                setLoading(false);
            } else {
                AssignPlayerData(payload.player);
                await router.push("/quiz");
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error");
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full justify-center items-center px-4 py-10">
            {/* ✅ Desktop form only */}
            <div className="hidden sm:block w-fit p-8 border rounded bg-white shadow-md">
                <form onSubmit={handleLogin} className="space-y-4 w-96">
                    <h1 className="text-center mb-4">
                        <span className="inline-block bg-blue-400 text-black font-bold text-3xl px-4 py-1 rounded">
                            Welcome Back!
                        </span>
                    </h1>

                    {error && <p className="text-red-600">{error}</p>}

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border-2 rounded px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Your Password Here"
                                className="w-full border-2 rounded px-3 py-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(p => !p)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="flex justify-between text-sm text-gray-600 pt-2">
                        <a href="/forgot-password" className="hover:underline">
                            Forgot password?
                        </a>
                        <a href="/signup" className="hover:underline">
                            New to Guhuza? Create account
                        </a>
                    </div>
                </form>
            </div>

            {/* ✅ Mobile Guhuza login only */}
            <div className="block sm:hidden w-full max-w-sm border rounded p-6 bg-white shadow-md">
                <h1 className="text-center text-2xl font-bold mb-4 text-black">Guhuza Login</h1>
                <LoginButton />
            </div>
        </div>
    );
}
