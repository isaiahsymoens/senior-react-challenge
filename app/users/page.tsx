"use client";

import {useState} from "react";
import { UserTable } from "../components/user-table/user-table";

type GenderFilter = "all" | "male" | "female";

export default function UsersPage() {
  const [searchText, setSearchText] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");

  return (
    <div className="flex flex-1">
      <div className="w-full max-w-5xl mx-auto flex flex-1 flex-col gap-6 px-4 py-6">
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex flex-1 flex-col gap-2">
              <label className="text-sm">Search</label>
              <input 
                className="w-full h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
              />
            </div>
            <div className="flex flex-col gap-2 sm:min-w-56">
              <label className="text-sm font-medium">Gender</label>
              <select
                className="h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value as GenderFilter)}
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">
              <span>Page 1{" "}of{" "}1</span>
            </div>
            <div className="flex gap-3">
              <button
                className="border border-zinc-600 rounded-lg px-2 py-1 disabled:opacity-50"
                onClick={() => alert("test.")}
              >
                Prev
              </button>
              <button
                className="border border-zinc-600 rounded-lg px-2 py-1 disabled:opacity-50"
                onClick={() => alert("test.")}
              >
                Next
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 shadow-sm">
          <UserTable />
        </section>
      </div>
    </div>
  );
}