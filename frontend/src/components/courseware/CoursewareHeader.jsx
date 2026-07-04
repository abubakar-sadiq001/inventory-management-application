function CoursewareHeader({
  search,
  setSearch,
  semesters,
  setSemesterFlt,
  semesterFlt,
  setLevelFlt,
  levelFlt,
  levels,
  filtered,
  onSetModal,
}) {
  return (
    <header>
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 text-xl font-extrabold text-slate-900">
            Courseware
          </div>
          <div className="mb-5 text-sm text-slate-500">
            All items tracked across NOUN study centres. Use the filters below
            to narrow results.
          </div>
        </div>

        <div>
          <button
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800"
            onClick={() => onSetModal({ type: "create", undefined })}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Course
          </button>
        </div>
      </div>

      <div className="mb-4.5 flex flex-wrap items-center gap-2.5">
        <input
          className="font-inherit min-w-[180px] flex-1 rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
          placeholder="Search by title, code, or level…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="font-inherit rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
          value={levelFlt}
          onChange={(e) => setLevelFlt(e.target.value)}
        >
          {levels.map((l) => (
            <option key={l}>{l === "All Levels" ? "All Levels" : l}</option>
          ))}
        </select>
        <select
          className="font-inherit rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
          value={semesterFlt}
          onChange={(e) => setSemesterFlt(e.target.value)}
        >
          {semesters.map((s) => (
            <option key={s}>
              {s === "All Semesters" ? "All Semesters" : s}
            </option>
          ))}
        </select>
        <span className="ml-auto self-center text-xs whitespace-nowrap text-slate-500">
          {filtered?.length} record{filtered?.length !== 1 ? "s" : ""}
        </span>
      </div>
    </header>
  );
}

export default CoursewareHeader;
