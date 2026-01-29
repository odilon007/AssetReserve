'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await supabase
            .from('profiles')
            .select('id, nome, email, role');

        setUsers(data || []);
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Usuários</h2>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Nome</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td className="border p-2">{u.nome}</td>
                            <td className="border p-2">{u.email}</td>
                            <td className="border p-2">{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}