import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activePage="courseware" onNav="courseware" />

      <div className="flex-1 overflow-y-auto px-8 py-7">
        <header className="mb-7 flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="text-[11px] tracking-widest text-slate-400 uppercase">
            NOUN Smart Inventory Management System
          </div>
          {/* <div className="text-[11px] text-slate-400">
            {`${7} records loaded`}
          </div> */}
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
