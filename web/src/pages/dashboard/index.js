import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Calendar from '@/components/Calendar/Calendar'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <AppLayout>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="bg-white border-b border-gray-200">
                    <Calendar user={user}/>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
