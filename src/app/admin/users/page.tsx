import { requireRole } from '@/utils/auth';

export default async function UserManagement() {
   await requireRole(['Admin', 'Super Admin']);

   const users = [
      { id: '1', name: 'Alex Johnson', email: 'alex@example.com', city: 'New York', role: 'Seller', status: 'ACTIVE', joined: '2 days ago' },
      { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', city: 'London', role: 'Admin', status: 'ACTIVE', joined: '1 month ago' },
      { id: '3', name: 'Mike Ross', email: 'mike@example.com', city: 'Chicago', role: 'Seller', status: 'SUSPENDED', joined: '1 week ago' },
   ];

   return (
      <div className="p-12 max-w-screen-xl mx-auto">
         <div className="flex justify-between items-end mb-12">
            <div>
               <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
                  User <span className="text-purple-500 uppercase italic">MANAGEMENT</span>
               </h1>
               <p className="text-slate-500 font-bold text-lg">
                  Monitor and control user accounts, permissions and platform access.
               </p>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition flex items-center gap-3">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
               Add New User
            </button>
         </div>

         {/* Search + Filter */}
         <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1 relative">
               <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>

               <input
                  type="text"
                  placeholder="Search by name, email or city..."
                  className="w-full bg-[#111] border border-white/10 rounded-3xl pl-16 pr-8 py-5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
               />
            </div>

            <button className="bg-white/10 hover:bg-white/20 px-8 py-5 rounded-3xl border border-white/10 font-black text-slate-400 flex items-center gap-3">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4" />
               </svg>
               Filters
            </button>
         </div>

         {/* Table */}
         <div className="rounded-3xl overflow-hidden border border-white/10">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/10 text-xs font-black uppercase text-slate-500">
                     <th className="px-10 py-6">User Details</th>
                     <th className="px-10 py-6">Role</th>
                     <th className="px-10 py-6">Status</th>
                     <th className="px-10 py-6">Joined</th>
                     <th className="px-10 py-6 text-center">Actions</th>
                  </tr>
               </thead>

               <tbody className="divide-y divide-white/10">
                  {users.map((user) => (
                     <tr key={user.id} className="hover:bg-white/5 transition">
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                 <span className="text-xl font-black text-indigo-400">
                                    {user.name.charAt(0)}
                                 </span>
                              </div>

                              <div>
                                 <p className="text-lg font-black text-white">{user.name}</p>
                                 <p className="text-xs text-slate-500">{user.email} • {user.city}</p>
                              </div>
                           </div>
                        </td>

                        <td className="px-10 py-8">
                           <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded">
                              {user.role}
                           </span>
                        </td>

                        <td className="px-10 py-8">
                           <span className={`text-xs font-bold px-3 py-1 rounded ${user.status === 'ACTIVE'
                                 ? 'bg-green-500/20 text-green-400'
                                 : 'bg-red-500/20 text-red-400'
                              }`}>
                              {user.status}
                           </span>
                        </td>

                        <td className="px-10 py-8 text-slate-500 text-sm">
                           {user.joined}
                        </td>

                        <td className="px-10 py-8 text-center">
                           <button className="text-slate-400 hover:text-white">
                              ⋮
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}