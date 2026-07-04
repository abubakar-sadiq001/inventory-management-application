import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../data/navData";
import { getAuthUser, logout } from "../services/api-endpoints";

export default function Sidebar() {
  const location = useLocation();
  const activePage = location.pathname.slice(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthUser()
      .then((user) => setUser(user))
      .catch((e) => console.log(e));
  }, []);

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();

      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-55 shrink-0 flex-col bg-[#1e3a5f] font-sans text-slate-300">
      <div className="border-b border-[#1e4080] px-5 pt-5 pb-4">
        <div className="text-[10px] tracking-[0.14em] text-blue-400 uppercase">
          NOUN
        </div>
        <div className="mt-0.5 text-base font-extrabold tracking-wide text-white">
          SIMS
        </div>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            to={item.id}
            key={item.id}

            className={`flex cursor-pointer items-center gap-2.5 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
              activePage === item.id
                ? "border-l-[3px] border-blue-400 bg-white/10 text-white"
                : "border-l-[3px] border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="w-4.5 text-center text-[15px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-[#1e4080] px-5 py-3.5">
        <div className="mb-0.5 text-xs font-bold text-slate-200">
          {user?.username}
        </div>
        <div className="mb-2.5 text-[11px] text-blue-400">= {user?.role}</div>
        <button
          className="w-full cursor-pointer rounded border border-red-900/30 bg-red-900/20 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-900/30"
          disabled={loading}
          onClick={handleLogout}
        >
          {loading ? "Signin Out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
