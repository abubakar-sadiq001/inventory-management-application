import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api-endpoints";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 font-sans">
      <div className="w-90 overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="bg-[#1e3a5f] px-8 py-7 text-center text-white">
          <div className="mb-1 text-[11px] tracking-[0.18em] text-blue-300 uppercase">
            National Open University of Nigeria
          </div>
          <div className="mb-0.5 text-xl font-bold tracking-wide">
            NOUN SIMS
          </div>
          <div className="text-xs text-blue-300">
            Smart Inventory Management System
          </div>
        </div>
        <div className="px-8 py-8">
          {error && (
            <div className="mb-3.5 rounded border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-600 uppercase"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="username"
                className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-600 uppercase"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`mt-5.5 w-full cursor-pointer rounded border-none bg-[#1e3a5f] py-2.5 text-sm font-bold tracking-wide text-white transition-opacity ${
                loading ? "cursor-not-allowed opacity-70" : "hover:opacity-90"
              }`}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
