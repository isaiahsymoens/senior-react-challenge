export const UserTable = () => {
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
          <tr className="border border-b border-zinc-100 last:border-0">
            <td className="px-4 py-3">Test1</td>
            <td className="px-4 py-3">Test2</td>
            <td className="px-4 py-3">Test3</td>
            <td className="px-4 py-3">Test4</td>
          </tr>
          <tr className="border border-b border-zinc-100 last:border-0">
            <td className="px-4 py-3">Test1</td>
            <td className="px-4 py-3">Test2</td>
            <td className="px-4 py-3">Test3</td>
            <td className="px-4 py-3">Test4</td>
          </tr>
          <tr className="border border-b border-zinc-100 last:border-0">
            <td className="px-4 py-3">Test1</td>
            <td className="px-4 py-3">Test2</td>
            <td className="px-4 py-3">Test3</td>
            <td className="px-4 py-3">Test4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}