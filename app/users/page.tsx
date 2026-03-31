"use client";

import {useMemo, useState} from "react";
import {UserTable} from "../components/user-table/user-table";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useDebounced} from "../hooks/useDebounced";
import {fetchUsers} from "../api/users";

type GenderFilter = "all" | "male" | "female";

const PAGE_SIZE = 10;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");

  const debouncedSearch = useDebounced(searchText.trim(), 400);
  const skip = (page - 1) * PAGE_SIZE;

  const usersQuery = useQuery({
    queryKey: ["users", {pageSize: PAGE_SIZE, skip, q: debouncedSearch}],
    queryFn: () => fetchUsers({limit: PAGE_SIZE, skip, q: debouncedSearch}),
    placeholderData: keepPreviousData,
  });

  const filteredUsers = useMemo(() => {
    const users = usersQuery.data?.users ?? [];
    if (gender === "all") return users;
    return users.filter(u => u.gender === gender);
  }, [gender, usersQuery]);

  console.log("filteredUsers :", filteredUsers);

  const total = usersQuery.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const canPrev = page > 1;
  const canNext = page < pageCount;

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
              <span>Page {page}{" "}of{" "}{pageCount}</span>
            </div>
            <div className="flex gap-3">
              <button
                className="border border-zinc-600 rounded-lg px-2 py-1 disabled:opacity-50"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={!canPrev || usersQuery.isFetching}
              >
                Prev
              </button>
              <button
                className="border border-zinc-600 rounded-lg px-2 py-1 disabled:opacity-50"
                onClick={() => setPage(prev => Math.min(pageCount, prev + 1))}
                disabled={!canNext || usersQuery.isFetching}
              >
                Next
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 shadow-sm">
          <UserTable 
            users={filteredUsers}
          />
        </section>
      </div>
    </div>
  );
}