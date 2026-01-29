'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLayout({ children}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data : { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/auth');
                return;
            }

            const { data: profile} = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profile?.role !== 'admin') {
                router.push('/site/ativos');
                return;
            }

            setLoading(false);
        };

        checkAdmin();
    }, []);

    if (loading) return <p className="p-6">Carregando...</p>;

    return <>{children}</>;
}