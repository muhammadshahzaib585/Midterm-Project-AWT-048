import { requireRole } from '@/utils/auth';
import UsersClient from './UsersClient';

export default async function UserManagement() {
   await requireRole(['Admin', 'Super Admin']);

   const initialUsers = [
      { id: '1', name: 'Alex Johnson', email: 'alex@example.com', city: 'New York', role: 'Client', status: 'ACTIVE', joined: '2 days ago' },
      { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', city: 'London', role: 'Admin', status: 'ACTIVE', joined: '1 month ago' },
      { id: '3', name: 'Mike Ross', email: 'mike@example.com', city: 'Chicago', role: 'Client', status: 'SUSPENDED', joined: '1 week ago' },
   ];

   return <UsersClient initialUsers={initialUsers} />;
}