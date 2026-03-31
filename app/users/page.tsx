"use client";

import {useState} from "react";
import {UserTable} from "../components/user-table/user-table";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useDebounced} from "../hooks/useDebounced";
import {fetchUserById, fetchUsers} from "../api/users";
import {UserDetailsModal} from "../components/user-details-modal/user-details-modal";
import {Pagination} from "../components/pagination/pagination";

export type GenderFilter = "all" | "male" | "female";

const PAGE_SIZE = 10;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const debouncedSearch = useDebounced(searchText.trim(), 400);
  const skip = (page - 1) * PAGE_SIZE;

  const usersQuery = useQuery({
    queryKey: ["users", {pageSize: PAGE_SIZE, skip, q: debouncedSearch, gender}],
    queryFn: () => fetchUsers({limit: PAGE_SIZE, skip, q: debouncedSearch, gender}),
    placeholderData: keepPreviousData,
  });

  const detailsQuery = useQuery({
    queryKey: ["user", {id: selectedUserId}],
    queryFn: () => fetchUserById(selectedUserId as number),
    enabled: selectedUserId !== null,
  });

  const selectUser = (id: number) => {
    setSelectedUserId(id as number);
  }
  
  const total = usersQuery.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="flex flex-1">
      <div className="w-full max-w-5xl mx-auto flex flex-1 flex-col gap-6 px-4 py-6">
        <header>
          <h1 className="text-2xl font-semibold">Users Admin</h1>
        </header>
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex flex-1 flex-col gap-2">
              <label className="text-sm">Search</label>
              <input 
                className="w-full h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setGender("all");
                  setPage(1);
                }}
                placeholder="Search"
              />
            </div>
            <div className="flex flex-col gap-2 sm:min-w-56">
              <label className="text-sm font-medium">Gender</label>
              <select
                className="h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none disabled:opacity-50"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value as GenderFilter);
                  setPage(1);
                }}
                disabled={usersQuery.isFetching}
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <Pagination 
            page={page}
            pageCount={pageCount}
            isLoading={usersQuery.isFetching}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => setPage(prev => Math.max(1, prev - 1))}
            onNext={() => setPage(prev => Math.min(pageCount, prev + 1))}
          />
        </section>
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 shadow-sm">
          <UserTable 
            users={usersQuery?.data?.users || []}
            onSelectUser={selectUser}
          />
        </section>
        <UserDetailsModal 
          open={selectedUserId !== null}
          user={detailsQuery.data ?? null}
          isLoading={detailsQuery.isFetching}
          onClose={() => setSelectedUserId(null)}
        />
      </div>
    </div>
  );
}