'use client';

import { useState } from 'react';

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
   const [users, setUsers] = useState(initialUsers);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [newUser, setNewUser] = useState({ name: '', email: '', city: '', role: 'Client' });

   const handleAddUser = (e: React.FormEvent) => {
      e.preventDefault();
      const user = {
         id: Math.random().toString(),
         ...newUser,
         status: 'ACTIVE',
         joined: 'Just now'
      };
      setUsers([user, ...users]);
      setIsModalOpen(false);
      setNewUser({ name: '', email: '', city: '', role: 'Client' });
   };

   const filteredUsers = users.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div className="p-12 max-w-screen-xl mx-auto">
         {/* Modal */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
               <div className="bg-[#022c22] border border-emerald-500/30 p-8 rounded-3xl shadow-2xl w-full max-w-md animate-reveal-up">
                  <h2 className="text-3xl font-black text-emerald-50 mb-6">Add <span className="text-emerald-400 italic">User</span></h2>
                  <form onSubmit={handleAddUser} className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">Name</label>
                        <input required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full bg-[#064e3b]/30 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">Email</label>
                        <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full bg-[#064e3b]/30 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">City</label>
                           <input required type="text" value={newUser.city} onChange={e => setNewUser({...newUser, city: e.target.value})} className="w-full bg-[#064e3b]/30 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-emerald-100/60 uppercase tracking-widest mb-2">Role</label>
                           <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full bg-[#064e3b]/30 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none">
                              <option value="Client">Client</option>
                              <option value="Admin">Admin</option>
                           </select>
                        </div>
                     </div>
                     <div className="flex gap-4 pt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-emerald-100/60 hover:text-white transition">Cancel</button>
                        <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#022c22] font-black py-3 rounded-xl shadow-lg transition">Create User</button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         <div className="flex justify-between items-end mb-12">
            <div>
               <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
                  User <span className="text-emerald-500 uppercase italic">MANAGEMENT</span>
               </h1>
               <p className="text-emerald-100/60 font-bold text-lg">
                  Monitor and control user accounts, permissions and platform access.
               </p>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition flex items-center gap-3">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
               Add New User
            </button>
         </div>

         {/* Search + Filter */}
         <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1 relative">
               <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-100/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>

               <input
                  type="text"
                  placeholder="Search by name, email or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#064e3b]/30 border border-emerald-500/20 rounded-3xl pl-16 pr-8 py-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-white"
               />
            </div>

            <button onClick={() => alert('Filters modal coming soon!')} className="bg-white/5 hover:bg-white/10 px-8 py-5 rounded-3xl border border-emerald-500/20 font-black text-emerald-100/60 flex items-center gap-3 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4" />
               </svg>
               Filters
            </button>
         </div>

         {/* Table */}
         <div className="rounded-3xl overflow-hidden border border-emerald-500/20">
            <table className="w-full text-left">
               <thead className="bg-[#064e3b]/30">
                  <tr className="border-b border-emerald-500/20 text-xs font-black uppercase text-emerald-100/60">
                     <th className="px-10 py-6">User Details</th>
                     <th className="px-10 py-6">Role</th>
                     <th className="px-10 py-6">Status</th>
                     <th className="px-10 py-6">Joined</th>
                     <th className="px-10 py-6 text-center">Actions</th>
                  </tr>
               </thead>

               <tbody className="divide-y divide-emerald-500/10 bg-[#022c22]/50">
                  {filteredUsers.map((user) => (
                     <tr key={user.id} className="hover:bg-emerald-500/5 transition">
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-full bg-emerald-600/20 flex items-center justify-center">
                                 <span className="text-xl font-black text-emerald-400">
                                    {user.name.charAt(0)}
                                 </span>
                              </div>

                              <div>
                                 <p className="text-lg font-black text-emerald-50">{user.name}</p>
                                 <p className="text-xs text-emerald-100/60">{user.email} • {user.city}</p>
                              </div>
                           </div>
                        </td>

                        <td className="px-10 py-8">
                           <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded text-emerald-50">
                              {user.role}
                           </span>
                        </td>

                        <td className="px-10 py-8">
                           <span className={`text-xs font-bold px-3 py-1 rounded ${user.status === 'ACTIVE'
                                 ? 'bg-emerald-500/20 text-emerald-400'
                                 : 'bg-rose-500/20 text-rose-400'
                              }`}>
                              {user.status}
                           </span>
                        </td>

                        <td className="px-10 py-8 text-emerald-100/60 text-sm">
                           {user.joined}
                        </td>

                        <td className="px-10 py-8 text-center">
                           <button onClick={() => alert('Action menu opened!')} className="text-emerald-100/40 hover:text-white transition p-2">
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
