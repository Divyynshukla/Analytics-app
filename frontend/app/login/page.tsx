"use client";

import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userEmail", email);
      }
      console.log(res.data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden
                    bg-gradient-to-br from-[#eef3ff] via-[#f7f9ff] to-white">

      {/* ===== Gradient Blobs ===== */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px]
                      bg-gradient-to-br from-blue-400 to-indigo-400
                      rounded-full blur-[120px] opacity-25" />

      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px]
                      bg-gradient-to-br from-indigo-300 to-sky-300
                      rounded-full blur-[120px] opacity-25" />

      {/* ===== Bottom Wave SVG ===== */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#dbe7ff"
          fillOpacity="0.6"
          d="M0,256L80,234.7C160,213,320,171,480,176C640,181,800,235,960,240C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>

      {/* ===== Login Card ===== */}
      <div className="relative z-10 w-[420px]
                      bg-white/90 backdrop-blur-xl
                      rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                      px-8 py-10">
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please login to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            className="w-full px-4 py-3 rounded-xl border border-slate-200
                       text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-transparent transition"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-xl border border-slate-200
                       text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-transparent transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-medium
                       hover:from-blue-700 hover:to-indigo-700
                       shadow-lg transition">
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Forgot password?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Reset
          </span>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/register")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}