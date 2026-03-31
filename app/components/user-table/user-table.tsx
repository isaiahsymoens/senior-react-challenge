import {User} from "@/app/api/users";

export type UserTableProps = {
  users: User[]
}

export const UserTable = ({users}: UserTableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-zinc-200 rounded-t-xl text-xs uppercase tracking-wide text-zinc-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => 
            <tr
              key={u.id + u.email} 
              className="border border-b border-zinc-100 last:border-0"
            >
              <td className="flex items-center px-4 py-3">
                <span className="w-8 h-8 overflow-hidden rounded-full bg-zinc-200 mr-1">
                  {u.image ? <img className="w-full h-full" src={u.image} alt="user avatar" /> :null}
                </span>
                <span className="flex flex-col">
                  <span>
                    {u.firstName + " " + u.lastName}
                  </span>
                  <span className="text-xs text-zinc-600">
                    @{u.username}
                  </span>
                </span>
              </td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3">{u.gender}</td>
              <td className="px-4 py-3">{u.company?.name ?? "--"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}