import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default async function AdminLayout({ children }) {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        redirect('/site/ativos');
    }

    return (
        <div ClassName="p-6">
            {children}
        </div>
    );
}